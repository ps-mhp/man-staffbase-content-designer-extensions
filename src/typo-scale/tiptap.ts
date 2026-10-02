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
 * Der Ausschnitt der TipTap-/ProseMirror-Schnittstelle, den die Typo-Skala
 * benutzt.
 *
 * Studio bringt TipTap selbst mit und hängt die Instanz als Property `editor`
 * an das contenteditable-Element. Eine eigene Abhängigkeit auf TipTap wäre
 * eine zweite Kopie mit eigener Version — gebraucht werden nur diese wenigen
 * Methoden, und nur sie sind hier beschrieben. Nichts davon ist von Staffbase
 * dokumentiert (Briefing 2.5).
 */

export interface PmNode {
  readonly type: { readonly name: string };
  readonly attrs: Readonly<Record<string, unknown>>;
}

export interface PmResolvedPos {
  readonly depth: number;
  node(depth: number): PmNode;
  before(depth: number): number;
}

export interface PmSelection {
  readonly empty: boolean;
  readonly from: number;
  readonly to: number;
  readonly $from: PmResolvedPos;
  /** Nur bei einer NodeSelection gesetzt. */
  readonly node?: PmNode;
}

export interface PmTransaction {
  setNodeMarkup(pos: number, type: undefined, attrs: Record<string, unknown>): PmTransaction;
}

type NodeVisitor = (node: PmNode, pos: number) => boolean | void;

export interface PmDoc {
  nodesBetween(from: number, to: number, visit: NodeVisitor): void;
  descendants(visit: NodeVisitor): void;
}

export interface TiptapEditor {
  readonly state: {
    readonly selection: PmSelection;
    readonly doc: PmDoc;
    readonly tr: PmTransaction;
  };
  readonly view: {
    dispatch(tr: PmTransaction): void;
    nodeDOM(pos: number): Node | null;
  };
  readonly commands: { focus(): boolean };
  readonly extensionManager: {
    readonly extensions: ReadonlyArray<{ readonly name: string; readonly options?: unknown }>;
  };
  chain(): { setNode(name: string): { run(): boolean } };
  on(event: "transaction" | "selectionUpdate", handler: () => void): void;
  off(event: "transaction" | "selectionUpdate", handler: () => void): void;
}

/** Das contenteditable-Element des Content Designers. */
export const EDITOR_SELECTOR = ".tiptap.ProseMirror";

/** Die TipTap-Instanz des gerade offenen Editors, falls einer offen ist. */
export function getEditor(root: ParentNode = document): TiptapEditor | null {
  const element = root.querySelector(EDITOR_SELECTOR) as (Element & { editor?: TiptapEditor }) | null;
  return element?.editor ?? null;
}
