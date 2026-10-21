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
 * Container und Spalten im Dokument finden und ihre Ausrichtung setzen.
 *
 * Der Dialog merkt sich den Container über seine Basis-ID, nicht über die
 * Position: zwischen Öffnen und Klick kann sich das Dokument verschieben, und
 * das Token selbst ändert die ID, nicht aber deren Basis.
 */

import { parseId, withToken } from "../id-codec";
import { PmNode, TiptapEditor } from "../tiptap";
import {
  COLUMN_NODE,
  CONTAINER_NODE,
  ColumnChoice,
  Level,
  choiceOfColumnToken,
  columnToken,
  containerToken,
  levelOfContainerToken,
} from "./alignment";

export interface ColumnState {
  readonly node: PmNode;
  readonly pos: number;
  readonly choice: ColumnChoice;
  /** Was im Frontend wirkt: die eigene Stufe oder die des Containers. */
  readonly effective: Level;
}

export interface ContainerState {
  readonly node: PmNode;
  readonly pos: number;
  readonly baseId: string;
  readonly level: Level;
  readonly columns: readonly ColumnState[];
}

export function containerState(node: PmNode, pos: number): ContainerState {
  const { token, baseId } = parseId(node.attrs.id);
  const level = levelOfContainerToken(token);
  const columns: ColumnState[] = [];
  node.forEach((child, offset) => {
    if (child.type.name !== COLUMN_NODE) return;
    const choice = choiceOfColumnToken(parseId(child.attrs.id).token);
    columns.push({ node: child, pos: pos + 1 + offset, choice, effective: choice === "inherit" ? level : choice });
  });
  return { node, pos, baseId: baseId ?? "", level, columns };
}

/** Der markierte Container bzw. der innerste um den Cursor. */
export function selectedContainer(editor: TiptapEditor): ContainerState | null {
  const { selection } = editor.state;
  if (selection.node?.type.name === CONTAINER_NODE) return containerState(selection.node, selection.from);
  const { $from } = selection;
  for (let depth = $from.depth; depth > 0; depth--) {
    const node = $from.node(depth);
    if (node.type.name === CONTAINER_NODE) return containerState(node, $from.before(depth));
  }
  return null;
}

export function findContainer(editor: TiptapEditor, baseId: string): ContainerState | null {
  let found: ContainerState | null = null;
  editor.state.doc.descendants((node, pos) => {
    if (found) return false;
    if (node.type.name === CONTAINER_NODE && parseId(node.attrs.id).baseId === baseId) {
      found = containerState(node, pos);
      return false;
    }
    return true;
  });
  return found;
}

/**
 * Als normale Editor-Transaktion: Rückgängig/Wiederholen wirken wie bei jeder
 * anderen Änderung. Kein `focus()` — der Dialog soll offen bleiben.
 * `setNodeAttribute` statt `setNodeMarkup`: Letzteres ersetzt den Container-
 * Node, Studio verliert die NodeSelection und schließt den Dialog.
 */
function setToken(editor: TiptapEditor, node: PmNode, pos: number, token: string | undefined): void {
  const id = withToken(node.attrs.id, token);
  if (id === node.attrs.id) return;
  const { tr } = editor.state;
  tr.setNodeAttribute(pos, "id", id);
  editor.view.dispatch(tr);
}

export function setContainerLevel(editor: TiptapEditor, baseId: string, level: Level): boolean {
  const container = findContainer(editor, baseId);
  if (!container) return false;
  setToken(editor, container.node, container.pos, containerToken(level));
  return true;
}

export function setColumnChoice(editor: TiptapEditor, baseId: string, index: number, choice: ColumnChoice): boolean {
  const column = findContainer(editor, baseId)?.columns[index];
  if (!column) return false;
  setToken(editor, column.node, column.pos, columnToken(choice));
  return true;
}
