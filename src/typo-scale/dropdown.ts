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
 * Hängt die Skala an das Format-Dropdown der kontextuellen Toolbar.
 *
 * Title-Element: `data-testid="title-toolbar"`, Text-Element:
 * `"contextual-text-toolbar"`. Die Optionen tragen die Klassen der
 * Studio-Optionen, damit sie aussehen wie native.
 */

import { applyEntry, entryForNode, findTarget } from "./editor-access";
import { SCALE, ScaleContext, ScaleEntry } from "./scale";
import { TiptapEditor } from "./tiptap";

export const LISTBOX_SELECTOR = '[role="listbox"].toolbar-single-select-dropdown';

const TOOLBAR_CONTEXT: Readonly<Record<string, ScaleContext>> = {
  "title-toolbar": "title",
  "contextual-text-toolbar": "text",
};

export const GROUP_LABEL = "MAN Typo-Skala";

export function buildOption(entry: ScaleEntry, isActive: boolean, onPick: (entry: ScaleEntry) => void): HTMLElement {
  const option = document.createElement("div");
  option.setAttribute("role", "option");
  option.setAttribute("aria-selected", String(isActive));
  option.dataset.sbtKey = entry.key;
  option.className = `ds-single-select__option${isActive ? " ds-single-select__option--selected" : ""}`;
  const text = document.createElement("span");
  text.className = "ds-single-select__option-text";
  const label = document.createElement("span");
  label.className = `ds-single-select__option-label${isActive ? " ds-single-select__option-label--selected" : ""}`;
  label.textContent = entry.label;
  const meta = document.createElement("span");
  meta.className = "sbt-option-meta";
  meta.textContent = `${entry.px}/${entry.lh}`;
  label.append(meta);
  text.append(label);
  option.append(text);
  // mousedown nicht weiterreichen: sonst verliert der Editor die Selektion.
  option.addEventListener("mousedown", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
  option.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    onPick(entry);
  });
  return option;
}

export function augmentListbox(listbox: HTMLElement, getEditor: () => TiptapEditor | null): void {
  const toolbar = document.querySelector<HTMLElement>("[data-contextual-toolbar]");
  const context = TOOLBAR_CONTEXT[toolbar?.dataset.testid ?? ""];
  const trigger = toolbar?.querySelector<HTMLElement>(".ds-single-select__trigger");
  const editor = getEditor();
  if (!context || !editor || !trigger || listbox.dataset.sbtAugmented) return;
  // Nur das Format-Dropdown, nicht etwa ein anderes Auswahlfeld der Toolbar.
  if (trigger.getAttribute("aria-controls") !== listbox.id) return;
  listbox.dataset.sbtAugmented = context;

  const target = findTarget(editor);
  const active = target ? entryForNode(target.node) : null;
  const container = listbox.firstElementChild ?? listbox;
  const header = document.createElement("div");
  header.className = "sbt-group";
  header.textContent = GROUP_LABEL;
  container.append(header);
  const onPick = (entry: ScaleEntry): void => {
    const current = getEditor();
    if (current) applyEntry(current, entry);
    trigger.click(); // schließt das Dropdown über die native Toggle-Logik
  };
  for (const entry of SCALE[context]) {
    container.append(buildOption(entry, active?.key === entry.key, onPick));
  }
}
