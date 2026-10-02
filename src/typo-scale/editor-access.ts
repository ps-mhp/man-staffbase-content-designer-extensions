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

import { parseId, withToken } from "./id-codec";
import { SCALE, ScaleEntry, TOKENS, contextOf } from "./scale";
import { PmNode, TiptapEditor } from "./tiptap";

export interface Target {
  readonly node: PmNode;
  readonly pos: number;
}

/** Der Block unter dem Cursor bzw. der markierte Block. */
export function findTarget(editor: TiptapEditor): Target | null {
  const { selection } = editor.state;
  if (selection.node && contextOf(selection.node.type.name)) {
    return { node: selection.node, pos: selection.from };
  }
  const { $from } = selection;
  for (let depth = $from.depth; depth > 0; depth--) {
    const node = $from.node(depth);
    if (contextOf(node.type.name)) return { node, pos: $from.before(depth) };
  }
  return null;
}

/** Alle Ziel-Blöcke der Selektion: Cursor → ein Block, Bereich → alle darin. */
export function findTargets(editor: TiptapEditor): Target[] {
  const { selection, doc } = editor.state;
  if (selection.empty || selection.node) {
    const target = findTarget(editor);
    return target ? [target] : [];
  }
  const targets: Target[] = [];
  doc.nodesBetween(selection.from, selection.to, (node, pos) => {
    if (!contextOf(node.type.name)) return true;
    targets.push({ node, pos });
    return false;
  });
  return targets;
}

/**
 * Der Token eines Blocks, wenn er zu dessen Node-Typ passt.
 *
 * Studio behält die ID beim nativen Typwechsel (Absatz → H2), ein Token kann
 * also am falschen Typ hängen. Das Safe-CSS bindet Tokens ebenfalls an ihre
 * Komponente, ein solcher Token wirkt dort also nicht.
 */
export function validToken(node: PmNode): string | null {
  const { token } = parseId(node.attrs.id);
  return token && TOKENS.get(token)?.apply.node === node.type.name ? token : null;
}

/** Die Stufe, die ein Block gerade trägt. */
export function entryForNode(node: PmNode): ScaleEntry | null {
  const context = contextOf(node.type.name);
  if (!context) return null;
  const token = validToken(node);
  if (token) return TOKENS.get(token) ?? null;
  const format = node.attrs.format ?? "big";
  return (
    SCALE[context].find(
      (entry) =>
        !entry.apply.token &&
        entry.apply.node === node.type.name &&
        (!entry.apply.format || entry.apply.format === format),
    ) ?? null
  );
}

/**
 * Setzt eine Stufe auf alle Ziel-Blöcke der Selektion.
 *
 * Alles läuft als normale Editor-Transaktion, Rückgängig/Wiederholen wirken
 * also wie bei jeder anderen Formatierung.
 */
export function applyEntry(editor: TiptapEditor, entry: ScaleEntry): void {
  const context = contextOf(entry.apply.node);
  const targetsInContext = (): Target[] =>
    findTargets(editor).filter((target) => contextOf(target.node.type.name) === context);
  if (targetsInContext().length === 0) return;
  if (targetsInContext().some((target) => target.node.type.name !== entry.apply.node)) {
    // Typwechsel über den nativen Befehl: kümmert sich um Inhalt und Marks,
    // behält die ID (Token) und wirkt auf den ganzen Bereich.
    editor.chain().setNode(entry.apply.node).run();
  }
  // setNodeMarkup ändert keine Größen → Positionen bleiben im selben tr gültig.
  const { tr } = editor.state;
  for (const { node, pos } of targetsInContext()) {
    if (node.type.name !== entry.apply.node) continue;
    const attrs: Record<string, unknown> = { ...node.attrs, id: withToken(node.attrs.id, entry.apply.token) };
    if (entry.apply.format) attrs.format = entry.apply.format;
    tr.setNodeMarkup(pos, undefined, attrs);
  }
  editor.view.dispatch(tr);
  editor.commands.focus();
}
