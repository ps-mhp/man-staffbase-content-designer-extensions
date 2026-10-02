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

import { GROUP_LABEL, augmentListbox } from "./dropdown";
import { fakeEditor } from "./fake-editor";

/** Toolbar und Dropdown, wie Studio sie rendert (gekürzt auf die benutzten Teile). */
function renderToolbar(testid: string, controls = "listbox-1"): { listbox: HTMLElement; trigger: HTMLElement } {
  document.body.innerHTML = `
    <div data-contextual-toolbar data-testid="${testid}">
      <button class="ds-single-select__trigger" aria-controls="${controls}"></button>
    </div>
    <div role="listbox" id="listbox-1" class="toolbar-single-select-dropdown">
      <div><div role="option">Absatz</div></div>
    </div>`;
  return {
    listbox: document.getElementById("listbox-1") as HTMLElement,
    trigger: document.querySelector(".ds-single-select__trigger") as HTMLElement,
  };
}

const optionKeys = (listbox: HTMLElement): string[] =>
  [...listbox.querySelectorAll<HTMLElement>("[data-sbt-key]")].map((option) => option.dataset.sbtKey ?? "");

describe("augmentListbox", () => {
  it("hängt im Text-Element die Text-Skala an und markiert die aktive Stufe", () => {
    const { listbox } = renderToolbar("contextual-text-toolbar");
    const editor = fakeEditor([{ type: "paragraph", attrs: { id: "sbt-body-s--p" }, pos: 0 }], 0);

    augmentListbox(listbox, () => editor);

    expect(listbox.textContent).toContain(GROUP_LABEL);
    expect(optionKeys(listbox)).toEqual(["h2", "h3", "h4", "body-l", "body-m", "body-s", "body-xs"]);
    expect(listbox.querySelector('[aria-selected="true"]')?.getAttribute("data-sbt-key")).toBe("body-s");
    expect(listbox.dataset.sbtAugmented).toBe("text");
  });

  it("hängt im Title-Element die Title-Skala an", () => {
    const { listbox } = renderToolbar("title-toolbar");
    const editor = fakeEditor([{ type: "title", attrs: { id: "t", format: "big" }, pos: 0 }], 0);

    augmentListbox(listbox, () => editor);

    expect(optionKeys(listbox)).toEqual(["display-2xl", "display-xl", "display-l", "display-m", "display-s", "h1"]);
  });

  it("erweitert dasselbe Dropdown nur einmal", () => {
    const { listbox } = renderToolbar("title-toolbar");
    const editor = fakeEditor([{ type: "title", attrs: { id: "t" }, pos: 0 }], 0);

    augmentListbox(listbox, () => editor);
    augmentListbox(listbox, () => editor);

    expect(optionKeys(listbox)).toHaveLength(6);
  });

  it("lässt fremde Auswahlfelder der Toolbar unberührt", () => {
    const { listbox } = renderToolbar("contextual-text-toolbar", "another-listbox");
    const editor = fakeEditor([{ type: "paragraph", attrs: { id: "p" }, pos: 0 }], 0);

    augmentListbox(listbox, () => editor);

    expect(optionKeys(listbox)).toHaveLength(0);
  });

  it("setzt die gewählte Stufe und schließt das Dropdown", () => {
    const { listbox, trigger } = renderToolbar("contextual-text-toolbar");
    const editor = fakeEditor([{ type: "paragraph", attrs: { id: "p" }, pos: 0 }], 0);
    const close = jest.fn();
    trigger.addEventListener("click", close);
    augmentListbox(listbox, () => editor);

    listbox.querySelector<HTMLElement>('[data-sbt-key="body-l"]')?.click();

    expect(editor.blocks[0].attrs.id).toBe("sbt-body-l--p");
    expect(close).toHaveBeenCalledTimes(1);
  });
});
