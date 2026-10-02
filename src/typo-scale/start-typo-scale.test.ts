/*!
 * Copyright 2026, MHP Management und IT-Beratung GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { FakeEditor, fakeEditor } from "./fake-editor";
import { STYLE_ID, startTypoScale } from "./start-typo-scale";

/** MutationObserver meldet nach dem aktuellen Microtask. */
const flush = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0));

/** Ein Editor-Element mit TipTap-Instanz, wie Studio es rendert. */
function mountEditor(editor: FakeEditor): HTMLElement {
  const element = Object.assign(document.createElement("div"), { editor });
  element.className = "tiptap ProseMirror";
  document.body.append(element);
  return element;
}

describe("startTypoScale", () => {
  let stop: () => void = () => undefined;
  afterEach(() => {
    stop();
    document.body.innerHTML = "";
  });

  it("bindet einen später geöffneten Editor und erweitert das Format-Dropdown", async () => {
    stop = startTypoScale({ saveGuard: false });
    const editor = fakeEditor([{ type: "paragraph", attrs: { id: "p" }, pos: 0 }], 0);

    mountEditor(editor);
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div data-contextual-toolbar data-testid="contextual-text-toolbar">
         <button class="ds-single-select__trigger" aria-controls="lb"></button>
       </div>
       <div role="listbox" id="lb" class="toolbar-single-select-dropdown"><div></div></div>`,
    );
    await flush();

    expect(editor.on).toHaveBeenCalledWith("transaction", expect.any(Function));
    expect(editor.on).toHaveBeenCalledWith("selectionUpdate", expect.any(Function));
    expect(document.querySelectorAll("#lb [data-sbt-key]")).toHaveLength(7);
  });

  it("bindet denselben Editor nur einmal und löst einen ersetzten", async () => {
    stop = startTypoScale({ saveGuard: false });
    const first = fakeEditor([{ type: "paragraph", attrs: { id: "p" }, pos: 0 }], 0);
    const firstElement = mountEditor(first);
    await flush();
    document.body.append(document.createElement("span"));
    await flush();
    expect(first.on).toHaveBeenCalledTimes(2);

    firstElement.remove();
    const second = fakeEditor([{ type: "paragraph", attrs: { id: "q" }, pos: 0 }], 0);
    mountEditor(second);
    await flush();

    expect(first.off).toHaveBeenCalledTimes(2);
    expect(second.on).toHaveBeenCalledTimes(2);
  });

  it("stellt Stylesheet und Konsolen-Zugang bereit und räumt beides beim Anhalten ab", () => {
    stop = startTypoScale();

    expect(document.getElementById(STYLE_ID)).not.toBeNull();
    expect(window.__sbtTypoScale?.parseId("sbt-body-l--x")).toEqual({ token: "body-l", baseId: "x" });

    stop();
    stop = () => undefined;

    expect(document.getElementById(STYLE_ID)).toBeNull();
    expect(window.__sbtTypoScale).toBeUndefined();
  });

  it("wendet über den Konsolen-Zugang eine Stufe auf den offenen Editor an", () => {
    const editor = fakeEditor([{ type: "paragraph", attrs: { id: "p" }, pos: 0 }], 0);
    mountEditor(editor);
    stop = startTypoScale({ saveGuard: false });

    window.__sbtTypoScale?.applyEntry("body-xs");

    expect(editor.blocks[0].attrs.id).toBe("sbt-body-xs--p");
  });
});
