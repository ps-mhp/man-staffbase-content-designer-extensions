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
 * Save-Guard: bereinigt den Inhalt, bevor Studio ihn speichert oder in der
 * Vorschau rendert.
 *
 * Hängt sich an den API-Client des Editors (`pages.drafts.saveContent`,
 * `pages.preview`) und entfernt Tokens, die die Skala nicht kennt oder die am
 * falschen Node-Typ hängen. Der Request bleibt sonst unverändert; fehlt der
 * Client, speichert Studio wie immer, nur ohne Bereinigung.
 */

import { parseId } from "./id-codec";
import { TOKENS } from "./scale";
import { TiptapEditor } from "./tiptap";

interface StoredBlock {
  readonly type?: string;
  readonly children?: readonly string[];
}

interface StoredContent {
  readonly blocks: Readonly<Record<string, StoredBlock>>;
  readonly content: readonly string[];
}

function isStoredContent(value: object): value is StoredContent {
  const candidate = value as Partial<StoredContent>;
  return !!candidate.blocks && typeof candidate.blocks === "object" && Array.isArray(candidate.content);
}

function sanitizeContent(content: StoredContent): StoredContent {
  const renames = new Map<string, string>();
  for (const [id, block] of Object.entries(content.blocks)) {
    const { token, baseId } = parseId(id);
    if (!token || !baseId) continue;
    const entry = TOKENS.get(token);
    if (!entry || entry.apply.node !== block?.type) renames.set(id, baseId);
  }
  if (renames.size === 0) return content;
  const swap = (id: string): string => renames.get(id) ?? id;
  const blocks = Object.fromEntries(
    Object.entries(content.blocks).map(([id, block]) => [
      swap(id),
      block?.children ? { ...block, children: block.children.map(swap) } : block,
    ]),
  );
  return { ...content, blocks, content: content.content.map(swap) };
}

/** Findet jeden Inhalt (`{ blocks, content }`) im Payload, egal wie tief. */
export function sanitizePayload<T>(value: T): T {
  if (Array.isArray(value)) return value.map(sanitizePayload) as T;
  if (!value || typeof value !== "object") return value;
  if (isStoredContent(value)) return sanitizeContent(value) as T;
  return Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, sanitizePayload(inner)])) as T;
}

type ApiCall = (this: unknown, ...args: unknown[]) => unknown;

interface PagesClient {
  drafts?: { saveContent?: ApiCall; __sbtGuarded?: boolean };
  preview?: ApiCall;
}

/**
 * Hängt den Guard an den API-Client des Editors. Einmal je Client: Studio
 * behält den Client über Editor-Wechsel hinweg.
 */
export function installSaveGuard(editor: TiptapEditor): void {
  const config = editor.extensionManager.extensions.find((extension) => extension.name === "configuration");
  const options = config?.options as { apiClient?: { pages?: PagesClient } } | undefined;
  const pages = options?.apiClient?.pages;
  const drafts = pages?.drafts;
  if (!pages || !drafts || drafts.__sbtGuarded || typeof drafts.saveContent !== "function") return;
  const { saveContent } = drafts;
  const { preview } = pages;
  // Absichtlich am fremden Objekt ersetzt: nur so laufen Speichern und
  // Vorschau von Studio durch den Guard.
  drafts.saveContent = function guardedSave(this: unknown, id: unknown, payload: unknown, signal: unknown) {
    return saveContent.call(this, id, sanitizePayload(payload), signal);
  };
  if (typeof preview === "function") {
    pages.preview = function guardedPreview(this: unknown, id: unknown, body: unknown, query: unknown, signal: unknown) {
      return preview.call(this, id, sanitizePayload(body), query, signal);
    };
  }
  drafts.__sbtGuarded = true;
}
