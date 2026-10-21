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

import { TreeEditor, treeEditor } from "./fake-tree";
import { VALIGN_STYLE_ID, startValign } from "./start-valign";

/** MutationObserver meldet nach dem aktuellen Microtask. */
const flush = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0));

function mountEditor(editor: TreeEditor): void {
  const element = Object.assign(document.createElement("div"), { editor });
  element.className = "tiptap ProseMirror";
  document.body.append(element);
}

const page = () => [
  {
    type: "container",
    id: "c",
    children: [
      { type: "column", id: "k1", children: [] },
      { type: "column", id: "k2", children: [] },
    ],
  },
];

describe("startValign", () => {
  let stop: () => void = () => undefined;
  afterEach(() => {
    stop();
    document.body.innerHTML = "";
  });

  it("bindet einen später geöffneten Editor und ergänzt einen erscheinenden Layout-Tab", async () => {
    stop = startValign({ saveGuard: false });
    expect(document.getElementById(VALIGN_STYLE_ID)).not.toBeNull();
    const editor = treeEditor(page(), { node: 0 });

    mountEditor(editor);
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div role="dialog"><div role="tabpanel"><div role="group">
         <button data-testid="1-1-column-layout-button"></button>
       </div></div></div>`,
    );
    await flush();

    expect(editor.on).toHaveBeenCalledWith("transaction", expect.any(Function));
    expect(document.querySelectorAll(".sbt-valign__row")).toHaveLength(3);
    window.__sbtValign?.setContainerLevel("bottom");
    expect(editor.idAt(0)).toBe("sbt-valign-bottom--c");
  });

  it("räumt beim Anhalten alles ab", async () => {
    stop = startValign({ saveGuard: false });
    const editor = treeEditor(page(), { node: 0 });
    mountEditor(editor);
    await flush();

    stop();
    stop = () => undefined;

    expect(document.getElementById(VALIGN_STYLE_ID)).toBeNull();
    expect(window.__sbtValign).toBeUndefined();
    expect(editor.off).toHaveBeenCalledWith("transaction", expect.any(Function));
  });
});
