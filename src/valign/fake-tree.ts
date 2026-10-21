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
 * Ein Stellvertreter des TipTap-Editors für Tests mit verschachteltem
 * Dokument (Sektion → Container → Spalte → Absatz). Positionen wie in
 * ProseMirror: Kinder beginnen bei `pos + 1`, jeder Node ist
 * `2 + Größe der Kinder` groß. Nur Tests importieren diese Datei.
 */

import { PmNode, PmResolvedPos, TiptapEditor } from "../tiptap";

export interface TreeSpec {
  type: string;
  id: string;
  children?: TreeSpec[];
}

interface Built {
  readonly type: string;
  attrs: Record<string, unknown>;
  readonly children: Built[];
  readonly pos: number;
  readonly size: number;
  readonly parent: Built | null;
}

export interface TreeEditor extends TiptapEditor {
  readonly dispatch: jest.Mock;
  /** Die aktuelle ID des Nodes an `pos`. */
  idAt(pos: number): unknown;
  /** Entfernt den Node an `pos` samt Kindern aus dem Dokument. */
  remove(pos: number): void;
}

function build(specs: readonly TreeSpec[], start: number, parent: Built | null): Built[] {
  let pos = start;
  return specs.map((spec) => {
    const node = { type: spec.type, attrs: { id: spec.id }, children: [] as Built[], pos, size: 0, parent };
    const children = build(spec.children ?? [], pos + 1, node);
    node.children.push(...children);
    node.size = 2 + children.reduce((sum, child) => sum + child.size, 0);
    pos += node.size;
    return node;
  });
}

function toNode(built: Built): PmNode {
  return {
    type: { name: built.type },
    attrs: { ...built.attrs },
    childCount: built.children.length,
    forEach: (visit) => built.children.forEach((child, index) => visit(toNode(child), child.pos - built.pos - 1, index)),
  };
}

/**
 * @param selection `node` = NodeSelection auf dem Node an der Position,
 *   `inside` = Cursor im Node an der Position.
 */
export function treeEditor(
  doc: readonly TreeSpec[],
  selection: { node: number } | { inside: number },
  doms: ReadonlyMap<number, Node> = new Map(),
): TreeEditor {
  let roots = build(doc, 0, null);
  const all = (): Built[] => {
    const out: Built[] = [];
    const walk = (nodes: Built[]): void => nodes.forEach((node) => (out.push(node), walk(node.children)));
    walk(roots);
    return out;
  };
  const at = (pos: number): Built => {
    const found = all().find((node) => node.pos === pos);
    if (!found) throw new Error(`kein Node an ${pos}`);
    return found;
  };
  const resolve = (pos: number): PmResolvedPos => {
    const chain: Built[] = [];
    for (let node: Built | null = at(pos); node; node = node.parent) chain.unshift(node);
    return { depth: chain.length, node: (depth) => toNode(chain[depth - 1]), before: (depth) => chain[depth - 1].pos };
  };
  const dispatch = jest.fn();

  return {
    dispatch,
    idAt: (pos: number) => at(pos).attrs.id,
    remove: (pos: number) => {
      const node = at(pos);
      const siblings = node.parent ? node.parent.children : roots;
      siblings.splice(siblings.indexOf(node), 1);
      if (!node.parent) roots = [...siblings];
    },
    get state() {
      const pending: Array<[number, Record<string, unknown>]> = [];
      const tr = {
        setNodeMarkup(pos: number, _type: undefined, attrs: Record<string, unknown>) {
          pending.push([pos, attrs]);
          return tr;
        },
        pending,
      };
      const isNode = "node" in selection;
      const pos = isNode ? selection.node : selection.inside;
      return {
        selection: {
          empty: !isNode,
          from: pos,
          to: pos,
          $from: resolve(pos),
          node: isNode ? toNode(at(pos)) : undefined,
        },
        doc: {
          nodesBetween: () => undefined,
          descendants: (visit: (node: PmNode, pos: number) => boolean | void) => {
            const walk = (nodes: Built[]): void => {
              for (const node of nodes) if (visit(toNode(node), node.pos) !== false) walk(node.children);
            };
            walk(roots);
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
    chain: () => ({ setNode: () => ({ run: () => true }) }),
    on: jest.fn(),
    off: jest.fn(),
  } as unknown as TreeEditor;
}
