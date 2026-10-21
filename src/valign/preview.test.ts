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

import { TreeSpec, treeEditor } from "./fake-tree";
import { highlightColumn, markColumns, studioCss } from "./preview";

/** Ein Node-View einer Spalte, wie Studio ihn rendert (gekürzt). */
function columnView(): { wrapper: HTMLElement; surface: HTMLElement } {
  const wrapper = document.createElement("div");
  wrapper.dataset.testid = "column-wrapper";
  wrapper.innerHTML = '<div data-testid="column"><div data-testid="column-background"><div></div></div></div>';
  return { wrapper, surface: wrapper.querySelector<HTMLElement>('[data-testid="column-background"]')! };
}

function page(containerId: string, column1: string, column2: string): TreeSpec[] {
  return [
    {
      type: "container",
      id: containerId,
      children: [
        { type: "column", id: column1, children: [{ type: "paragraph", id: "p1" }] },
        { type: "column", id: column2, children: [{ type: "paragraph", id: "p2" }] },
      ],
    },
  ];
}

describe("markColumns", () => {
  it("markiert die wirksame Stufe je Spalte und räumt veraltete Marken ab", () => {
    const first = columnView();
    const second = columnView();
    second.surface.dataset.sbtValign = "bottom";
    // Ein verschachtelter Container in Spalte 1 darf nicht mitmarkiert werden.
    const nested = columnView();
    first.surface.firstElementChild!.append(nested.wrapper);
    const editor = treeEditor(page("sbt-valign-center--c", "k1", "sbt-col-valign-top--k2"), { node: 0 }, new Map([
      [1, first.wrapper],
      [5, second.wrapper],
    ]));

    markColumns(editor);

    expect(first.surface.dataset.sbtValign).toBe("center");
    expect(second.surface.dataset.sbtValign).toBeUndefined();
    expect(nested.surface.dataset.sbtValign).toBeUndefined();
  });
});

describe("highlightColumn", () => {
  it("hebt genau eine Spalte hervor und nimmt sie zurück", () => {
    const first = columnView();
    const second = columnView();
    document.body.append(first.wrapper, second.wrapper);
    const editor = treeEditor(page("c", "k1", "k2"), { node: 0 }, new Map([
      [1, first.wrapper],
      [5, second.wrapper],
    ]));

    highlightColumn(editor, 1);
    highlightColumn(editor, 5);
    expect(first.wrapper.hasAttribute("data-sbt-valign-highlight")).toBe(false);
    expect(second.wrapper.hasAttribute("data-sbt-valign-highlight")).toBe(true);

    highlightColumn(editor, null);
    expect(second.wrapper.hasAttribute("data-sbt-valign-highlight")).toBe(false);
    document.body.innerHTML = "";
  });
});

describe("studioCss", () => {
  it("richtet die markierte Fläche per Flex aus", () => {
    const css = studioCss();
    expect(css).toContain('[data-sbt-valign="center"]{justify-content:center!important}');
    expect(css).toContain('[data-sbt-valign="bottom"]{justify-content:flex-end!important}');
  });
});
