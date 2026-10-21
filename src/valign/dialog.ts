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

/**
 * Ergänzt den Layout-Tab des Dialogs „Container bearbeiten“ um die
 * vertikale Ausrichtung: eine Zeile für den Container, darunter eine je
 * Spalte.
 *
 * Anker ist die Gruppe der Layout-Buttons (`data-testid` „…-column-layout-
 * button“) — die einzigen stabilen Merkmale des Tabs. Der Abschnitt steht
 * direkt dahinter. Studio baut das Tab-Panel bei jedem Tab-Wechsel neu, der
 * Beobachter ergänzt es dann erneut.
 *
 * Bei offenem Dialog ist der Container im Editor markiert; gemerkt wird
 * seine Basis-ID, jede Aktion sucht den Node darüber neu.
 */

import { TiptapEditor } from "../tiptap";
import { ColumnChoice, INHERIT_LABEL, LEVELS, LEVEL_LABELS, Level } from "./alignment";
import { ContainerState, findContainer, selectedContainer, setColumnChoice, setContainerLevel } from "./editor-access";
import { highlightColumn } from "./preview";

export const LAYOUT_BUTTON_SELECTOR = '[role="dialog"] [data-testid$="-column-layout-button"]';
export const SECTION_CLASS = "sbt-valign";

const CONTAINER_LABEL = "Vertikale Ausrichtung";
const SECTION_SELECTOR = `.${SECTION_CLASS}`;

const COLUMN_CHOICES: readonly ColumnChoice[] = ["inherit", ...LEVELS];

const labelOf = (choice: ColumnChoice): string => (choice === "inherit" ? INHERIT_LABEL : LEVEL_LABELS[choice]);

function optionGroup(label: string, choices: readonly ColumnChoice[], row: string): HTMLElement {
  const group = document.createElement("div");
  group.className = "sbt-valign__options";
  group.setAttribute("role", "radiogroup");
  group.setAttribute("aria-label", label);
  for (const choice of choices) {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "sbt-valign__option";
    option.setAttribute("role", "radio");
    option.setAttribute("aria-checked", "false");
    option.dataset.sbtRow = row;
    option.dataset.sbtChoice = choice;
    option.textContent = labelOf(choice);
    group.append(option);
  }
  return group;
}

/** Eine Zeile im Look der nativen Felder des Dialogs. */
function row(template: Element | null, label: string, choices: readonly ColumnChoice[], key: string): HTMLElement {
  const element = document.createElement("div");
  element.className = `${template?.className ?? ""} sbt-valign__row`.trim();
  element.dataset.sbtRow = key;
  const text = document.createElement("span");
  text.className = template?.querySelector('[data-c13y-component="field-label"]')?.className ?? "";
  text.textContent = label;
  element.append(text, optionGroup(label, choices, key));
  return element;
}

function build(section: HTMLElement, container: ContainerState): void {
  const template = section.closest('[role="tabpanel"]')?.querySelector('[data-c13y-component="field"]') ?? null;
  const rows = [row(template, CONTAINER_LABEL, LEVELS, "container")];
  if (container.columns.length > 1) {
    container.columns.forEach((_column, index) =>
      rows.push(row(template, `Spalte ${index + 1}`, COLUMN_CHOICES, String(index))),
    );
  }
  section.replaceChildren(...rows);
  section.dataset.sbtColumns = String(container.columns.length);
}

function sync(section: HTMLElement, container: ContainerState): void {
  if (section.dataset.sbtColumns !== String(container.columns.length)) build(section, container);
  for (const option of section.querySelectorAll<HTMLElement>(".sbt-valign__option")) {
    const { sbtRow, sbtChoice } = option.dataset;
    const current = sbtRow === "container" ? container.level : container.columns[Number(sbtRow)]?.choice;
    option.setAttribute("aria-checked", String(current === sbtChoice));
  }
}

function wire(section: HTMLElement, getEditor: () => TiptapEditor | null): void {
  section.addEventListener("click", (event) => {
    const option = (event.target as Element).closest<HTMLElement>(".sbt-valign__option");
    const editor = getEditor();
    const baseId = section.dataset.sbtContainer;
    if (!option || !editor || baseId === undefined) return;
    const { sbtRow, sbtChoice } = option.dataset;
    if (sbtRow === "container") setContainerLevel(editor, baseId, sbtChoice as Level);
    else setColumnChoice(editor, baseId, Number(sbtRow), sbtChoice as ColumnChoice);
    renderSections(editor, section.ownerDocument);
  });
  section.addEventListener("mouseover", (event) => {
    const key = (event.target as Element).closest<HTMLElement>(".sbt-valign__row")?.dataset.sbtRow;
    const editor = getEditor();
    const baseId = section.dataset.sbtContainer;
    const column =
      editor && baseId !== undefined && key !== undefined && key !== "container"
        ? findContainer(editor, baseId)?.columns[Number(key)]
        : undefined;
    highlightColumn(editor, column?.pos ?? null, section.ownerDocument);
  });
  section.addEventListener("mouseleave", () => highlightColumn(null, null, section.ownerDocument));
}

/** Ergänzt jeden offenen Layout-Tab, der den Abschnitt noch nicht hat. */
export function augmentDialogs(getEditor: () => TiptapEditor | null, root: ParentNode = document): void {
  const editor = getEditor();
  if (!editor) return;
  for (const button of root.querySelectorAll(LAYOUT_BUTTON_SELECTOR)) {
    const group = button.closest('[role="group"]');
    if (!group || group.nextElementSibling?.matches(SECTION_SELECTOR)) continue;
    const container = selectedContainer(editor);
    if (!container) continue;
    const section = document.createElement("div");
    section.className = SECTION_CLASS;
    section.dataset.sbtContainer = container.baseId;
    wire(section, getEditor);
    group.after(section);
    sync(section, container);
  }
}

/** Gleicht jeden Abschnitt mit dem Dokument ab, etwa nach Layoutwechsel oder Undo. */
export function renderSections(editor: TiptapEditor, root: ParentNode = document): void {
  for (const section of root.querySelectorAll<HTMLElement>(SECTION_SELECTOR)) {
    const baseId = section.dataset.sbtContainer;
    const container = baseId === undefined ? null : findContainer(editor, baseId);
    section.hidden = !container;
    if (container) sync(section, container);
  }
}
