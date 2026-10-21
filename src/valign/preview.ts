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
 * Vorschau der Ausrichtung im Editor.
 *
 * Die Node-Views der Spalten tragen im Editor nicht die Block-ID
 * (`id="column"`), die Frontend-Selektoren greifen dort also nicht. Die
 * wirksame Stufe kommt deshalb als `data-sbt-valign` an die Fläche der Spalte
 * (`column-background`, volle Zeilenhöhe), das Studio-CSS richtet darin aus.
 */

import { TiptapEditor } from "../tiptap";
import { CONTAINER_NODE } from "./alignment";
import { containerState } from "./editor-access";

export const COLUMN_SURFACE = '[data-testid="column-background"]';

const HIGHLIGHT_ATTRIBUTE = "data-sbt-valign-highlight";

export function markColumns(editor: TiptapEditor): void {
  editor.state.doc.descendants((node, pos) => {
    if (node.type.name !== CONTAINER_NODE) return true;
    for (const column of containerState(node, pos).columns) {
      const wrapper = editor.view.nodeDOM(column.pos);
      // Das erste Treffer ist die eigene Fläche; verschachtelte Container
      // liegen darin und kommen in diesem Durchlauf selbst dran.
      const surface = wrapper instanceof HTMLElement ? wrapper.querySelector<HTMLElement>(COLUMN_SURFACE) : null;
      if (!surface) continue;
      if (column.effective === "top") {
        if (surface.dataset.sbtValign) delete surface.dataset.sbtValign;
      } else if (surface.dataset.sbtValign !== column.effective) {
        surface.dataset.sbtValign = column.effective;
      }
    }
    return true;
  });
}

/** Hebt die Spalte an `pos` hervor; `null` nimmt jede Hervorhebung zurück. */
export function highlightColumn(editor: TiptapEditor | null, pos: number | null, root: ParentNode = document): void {
  for (const element of root.querySelectorAll(`[${HIGHLIGHT_ATTRIBUTE}]`)) element.removeAttribute(HIGHLIGHT_ATTRIBUTE);
  if (!editor || pos === null) return;
  const dom = editor.view.nodeDOM(pos);
  if (dom instanceof HTMLElement) dom.setAttribute(HIGHLIGHT_ATTRIBUTE, "");
}

export function studioCss(): string {
  const surface = `.ProseMirror ${COLUMN_SURFACE}`;
  return [
    `${surface}[data-sbt-valign]{display:flex!important;flex-direction:column!important}`,
    `${surface}[data-sbt-valign="center"]{justify-content:center!important}`,
    `${surface}[data-sbt-valign="bottom"]{justify-content:flex-end!important}`,
    `.ProseMirror [${HIGHLIGHT_ATTRIBUTE}]{outline:2px solid #2563eb!important;outline-offset:-2px}`,
    ".sbt-valign{display:flex;flex-direction:column;gap:8px}",
    ".sbt-valign[hidden]{display:none}",
    ".sbt-valign__row{display:flex;flex-direction:column;align-items:stretch;gap:6px}",
    ".sbt-valign__options{display:flex;border:1px solid #d4d4d8;border-radius:8px;overflow:hidden;background:#fff}",
    ".sbt-valign__option{font:500 12px/16px Inter,sans-serif;flex:1 1 auto;padding:6px 8px;border:0;background:transparent;color:#27272a;cursor:pointer;white-space:nowrap}",
    ".sbt-valign__option+.sbt-valign__option{border-inline-start:1px solid #d4d4d8}",
    ".sbt-valign__option:hover{background:#f4f4f5}",
    '.sbt-valign__option[aria-checked="true"]{background:#18181b;color:#fff}',
    ".sbt-valign__option:focus-visible{outline:2px solid #2563eb;outline-offset:-2px}",
  ].join("\n");
}
