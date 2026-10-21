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

import {
  findContainer,
  selectedContainer,
  setColumnChoice,
  setContainerLevel,
} from "./editor-access";
import { TreeSpec, treeEditor } from "./fake-tree";

/**
 * Sektion (0) → Container (1) → Spalte 1 (2) → Absatz (3),
 *                                 Spalte 2 (6) → Absatz (7).
 */
function page(containerId = "c", column1 = "k1", column2 = "k2"): TreeSpec[] {
  return [
    {
      type: "section",
      id: "s",
      children: [
        {
          type: "container",
          id: containerId,
          children: [
            { type: "column", id: column1, children: [{ type: "paragraph", id: "p1" }] },
            { type: "column", id: column2, children: [{ type: "paragraph", id: "p2" }] },
          ],
        },
      ],
    },
  ];
}

describe("selectedContainer", () => {
  it("nimmt den markierten Container und den um den Cursor", () => {
    for (const selection of [{ node: 1 }, { inside: 7 }]) {
      const container = selectedContainer(treeEditor(page(), selection));
      expect(container?.baseId).toBe("c");
      expect(container?.level).toBe("top");
      expect(container?.columns.map((column) => [column.pos, column.choice, column.effective])).toEqual([
        [2, "inherit", "top"],
        [6, "inherit", "top"],
      ]);
    }
  });

  it("gibt null außerhalb eines Containers", () => {
    expect(selectedContainer(treeEditor(page(), { inside: 0 }))).toBeNull();
  });

  it("lässt die Spalte den Container übersteuern", () => {
    const container = selectedContainer(
      treeEditor(page("sbt-valign-center--c", "k1", "sbt-col-valign-bottom--k2"), { node: 1 }),
    );
    expect(container?.baseId).toBe("c");
    expect(container?.columns.map((column) => [column.choice, column.effective])).toEqual([
      ["inherit", "center"],
      ["bottom", "bottom"],
    ]);
  });
});

describe("setContainerLevel / setColumnChoice", () => {
  it("setzt und entfernt das Container-Token, gleicher Wert ohne Transaktion", () => {
    const editor = treeEditor(page(), { node: 1 });

    expect(setContainerLevel(editor, "c", "bottom")).toBe(true);
    expect(editor.idAt(1)).toBe("sbt-valign-bottom--c");
    setContainerLevel(editor, "c", "bottom");
    expect(editor.dispatch).toHaveBeenCalledTimes(1);

    setContainerLevel(editor, "c", "top");
    expect(editor.idAt(1)).toBe("c");
  });

  it("setzt die Wahl einer Spalte über den Index", () => {
    const editor = treeEditor(page("sbt-valign-center--c"), { node: 1 });

    setColumnChoice(editor, "c", 1, "top");
    expect(editor.idAt(6)).toBe("sbt-col-valign-top--k2");
    expect(findContainer(editor, "c")?.columns[1].effective).toBe("top");

    setColumnChoice(editor, "c", 1, "inherit");
    expect(editor.idAt(6)).toBe("k2");
  });

  it("funktioniert mit den Basis-IDs der Seite", () => {
    const editor = treeEditor(page("2", "3", "x"), { node: 1 });

    setColumnChoice(editor, "2", 0, "center");

    expect(editor.idAt(2)).toBe("sbt-col-valign-center--3");
  });

  it("tut nichts bei unbekanntem Container oder Index", () => {
    const editor = treeEditor(page(), { node: 1 });

    expect(setContainerLevel(editor, "nope", "center")).toBe(false);
    expect(setColumnChoice(editor, "c", 2, "center")).toBe(false);
    expect(editor.dispatch).not.toHaveBeenCalled();
  });
});
