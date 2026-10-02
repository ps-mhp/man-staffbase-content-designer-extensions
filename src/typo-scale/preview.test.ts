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

import { fakeEditor } from "./fake-editor";
import { markNodeViews, studioCss, syncTriggerLabel } from "./preview";

describe("markNodeViews", () => {
  it("markiert Blöcke mit gültigem Token und räumt veraltete Marken ab", () => {
    const withToken = document.createElement("div");
    const stale = document.createElement("div");
    stale.dataset.sbt = "body-l";
    const wrongType = document.createElement("div");
    const editor = fakeEditor(
      [
        { type: "title", attrs: { id: "sbt-display-xl--t" }, pos: 0 },
        { type: "paragraph", attrs: { id: "p" }, pos: 4 },
        { type: "bigHeading", attrs: { id: "sbt-body-l--h" }, pos: 8 },
      ],
      0,
      undefined,
      new Map([
        [0, withToken],
        [4, stale],
        [8, wrongType],
      ]),
    );

    markNodeViews(editor);

    expect(withToken.dataset.sbt).toBe("display-xl");
    expect(stale.dataset.sbt).toBeUndefined();
    expect(wrongType.dataset.sbt).toBeUndefined();
  });
});

describe("syncTriggerLabel", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div data-contextual-toolbar><button class="ds-single-select__trigger"></button></div>';
  });

  const trigger = (): HTMLElement => document.querySelector(".ds-single-select__trigger") as HTMLElement;

  it("schreibt die aktive Stufe samt Größe an den Trigger", () => {
    syncTriggerLabel(fakeEditor([{ type: "title", attrs: { id: "sbt-display-2xl--t" }, pos: 0 }], 0));
    expect(trigger().dataset.sbtLabel).toBe("Display 2XL · 72");
  });

  it("leert das Label außerhalb der Skala, damit das native wieder erscheint", () => {
    trigger().dataset.sbtLabel = "Body L · 18";
    syncTriggerLabel(fakeEditor([{ type: "image", attrs: { id: "i" }, pos: 0 }], 0));
    expect(trigger().dataset.sbtLabel).toBe("");
  });
});

describe("studioCss", () => {
  it("bringt je Token eine Größe für die Vorschau mit", () => {
    const css = studioCss(true);
    expect(css).toContain('.ProseMirror [data-sbt="display-2xl"] [data-node-view-content]{font-size:72px!important;line-height:86px!important}');
    expect(css).toContain('.ProseMirror [data-sbt="body-xs"] [data-node-view-content]{font-size:12px!important;line-height:18px!important}');
  });

  it("blendet native Optionen nur auf Wunsch aus", () => {
    const rule = '[data-sbt-augmented] [role="option"]:not([data-sbt-key]){display:none}';
    expect(studioCss(true)).toContain(rule);
    expect(studioCss(false)).not.toContain(rule);
  });
});
