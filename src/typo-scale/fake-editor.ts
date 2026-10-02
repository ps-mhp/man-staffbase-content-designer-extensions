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
 * Ein Stellvertreter des TipTap-Editors für Tests: ein flaches Dokument aus
 * Blöcken, je Block eine Position. Nur Tests importieren diese Datei.
 */

import { PmNode, TiptapEditor } from "./tiptap";

export interface FakeBlock {
  type: string;
  attrs: Record<string, unknown>;
  pos: number;
}

export interface FakeEditor extends TiptapEditor {
  readonly blocks: FakeBlock[];
  readonly setNode: jest.Mock;
  readonly dispatch: jest.Mock;
}

const toNode = (block: FakeBlock): PmNode => ({ type: { name: block.type }, attrs: { ...block.attrs } });

/**
 * @param cursor Position des Blocks mit dem Cursor; mit `to` ein Bereich bis
 *   einschließlich des Blocks an `to`.
 * @param doms Die Node-Views je Position, wie `view.nodeDOM` sie liefert.
 */
export function fakeEditor(
  blocks: FakeBlock[],
  cursor: number,
  to?: number,
  doms: ReadonlyMap<number, Node> = new Map(),
): FakeEditor {
  const at = (pos: number): FakeBlock => {
    const block = blocks.find((candidate) => candidate.pos === pos);
    if (!block) throw new Error(`kein Block an ${pos}`);
    return block;
  };
  const between = (from: number, until: number): FakeBlock[] =>
    blocks.filter((block) => block.pos >= from && block.pos <= until);

  const setNode = jest.fn((type: string) => {
    for (const block of between(cursor, to ?? cursor)) block.type = type;
    return { run: () => true };
  });
  const dispatch = jest.fn();

  return {
    blocks,
    setNode,
    dispatch,
    get state() {
      const pending: Array<[number, Record<string, unknown>]> = [];
      const tr = {
        setNodeMarkup(pos: number, _type: undefined, attrs: Record<string, unknown>) {
          pending.push([pos, attrs]);
          return tr;
        },
        pending,
      };
      return {
        selection: {
          empty: to === undefined,
          from: cursor,
          to: to ?? cursor,
          $from: { depth: 1, node: () => toNode(at(cursor)), before: () => cursor },
        },
        doc: {
          nodesBetween: (from: number, until: number, visit: (node: PmNode, pos: number) => boolean | void) => {
            for (const block of between(from, until)) visit(toNode(block), block.pos);
          },
          descendants: (visit: (node: PmNode, pos: number) => boolean | void) => {
            for (const block of blocks) visit(toNode(block), block.pos);
          },
        },
        tr,
      };
    },
    view: {
      dispatch: (tr: { pending: Array<[number, Record<string, unknown>]> }) => {
        for (const [pos, attrs] of tr.pending) at(pos).attrs = attrs;
        dispatch(tr);
      },
      nodeDOM: (pos: number) => doms.get(pos) ?? null,
    },
    commands: { focus: () => true },
    extensionManager: { extensions: [] },
    chain: () => ({ setNode }),
    on: jest.fn(),
    off: jest.fn(),
  } as unknown as FakeEditor;
}
