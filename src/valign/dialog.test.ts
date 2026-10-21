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

import { augmentDialogs, renderSections } from "./dialog";
import { TreeEditor, TreeSpec, treeEditor } from "./fake-tree";

/** Der Layout-Tab, wie Studio ihn rendert (gekürzt, live am 21.10.2026). */
const DIALOG = `
  <div role="dialog" data-c13y-component="popover">
    <div role="tabpanel" data-c13y-component="tabs-content">
      <div role="group" aria-label="Layout">
        <button data-testid="1-column-layout-button"></button>
        <button data-testid="1-1-column-layout-button"></button>
      </div>
      <div data-c13y-component="field" class="ds-field__root">
        <label data-c13y-component="field-label" class="ds-field__label">Spalten nebeneinander anzeigen</label>
      </div>
    </div>
  </div>`;

function page(columns = 2, containerId = "c"): TreeSpec[] {
  return [
    {
      type: "container",
      id: containerId,
      children: Array.from({ length: columns }, (_, index) => ({
        type: "column",
        id: `k${index + 1}`,
        children: [{ type: "paragraph", id: `p${index + 1}` }],
      })),
    },
  ];
}

const section = (): HTMLElement | null => document.querySelector(".sbt-valign");
const labels = (): string[] =>
  [...document.querySelectorAll(".sbt-valign__row > span")].map((label) => label.textContent ?? "");
const checked = (): string[] =>
  [...document.querySelectorAll('.sbt-valign__option[aria-checked="true"]')].map(
    (option) => `${(option as HTMLElement).dataset.sbtRow}:${(option as HTMLElement).dataset.sbtChoice}`,
  );
const option = (row: string, choice: string): HTMLElement =>
  document.querySelector(`.sbt-valign__option[data-sbt-row="${row}"][data-sbt-choice="${choice}"]`)!;

function open(editor: TreeEditor): void {
  document.body.innerHTML = DIALOG;
  augmentDialogs(() => editor);
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("augmentDialogs", () => {
  it("setzt den Abschnitt einmal hinter die Layout-Gruppe, im Look der Felder", () => {
    const editor = treeEditor(page(), { node: 0 });
    open(editor);
    augmentDialogs(() => editor);

    expect(document.querySelectorAll(".sbt-valign")).toHaveLength(1);
    expect(section()?.previousElementSibling?.getAttribute("role")).toBe("group");
    expect(labels()).toEqual(["Vertikale Ausrichtung", "Spalte 1", "Spalte 2"]);
    expect(document.querySelector(".sbt-valign__row")?.classList).toContain("ds-field__root");
    expect(checked()).toEqual(["container:top", "0:inherit", "1:inherit"]);
  });

  it("zeigt bei einer Spalte nur die Container-Zeile", () => {
    open(treeEditor(page(1), { node: 0 }));
    expect(labels()).toEqual(["Vertikale Ausrichtung"]);
  });

  it("ergänzt nichts ohne markierten Container", () => {
    open(treeEditor([{ type: "paragraph", id: "x" }], { inside: 0 }));
    expect(section()).toBeNull();
  });
});

describe("Bedienung", () => {
  it("setzt die Tokens per Klick und zeigt den neuen Zustand", () => {
    const editor = treeEditor(page(), { node: 0 });
    open(editor);

    option("container", "center").click();
    option("1", "bottom").click();

    expect(editor.idAt(0)).toBe("sbt-valign-center--c");
    expect(editor.idAt(5)).toBe("sbt-col-valign-bottom--k2");
    expect(checked()).toEqual(["container:center", "0:inherit", "1:bottom"]);
  });

  it("hebt beim Hovern die Spalte hervor und nimmt es beim Verlassen zurück", () => {
    const columnDom = document.createElement("div");
    const editor = treeEditor(page(), { node: 0 }, new Map([[5, columnDom]]));
    open(editor);
    document.body.append(columnDom);

    option("1", "top").dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
    expect(columnDom.hasAttribute("data-sbt-valign-highlight")).toBe(true);

    section()!.dispatchEvent(new MouseEvent("mouseleave"));
    expect(columnDom.hasAttribute("data-sbt-valign-highlight")).toBe(false);
  });
});

describe("renderSections", () => {
  it("folgt einem Layoutwechsel und blendet sich aus, wenn der Container fehlt", () => {
    const editor = treeEditor(page(), { node: 0 });
    open(editor);

    const wider = treeEditor(page(3, "sbt-valign-bottom--c"), { node: 0 });
    renderSections(wider);
    expect(labels()).toEqual(["Vertikale Ausrichtung", "Spalte 1", "Spalte 2", "Spalte 3"]);
    expect(checked()).toEqual(["container:bottom", "0:inherit", "1:inherit", "2:inherit"]);

    wider.remove(0);
    renderSections(wider);
    expect(section()?.hidden).toBe(true);
  });
});
