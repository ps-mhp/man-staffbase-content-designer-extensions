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
 * Vorschau im Editor: Node-Views bekommen `data-sbt="<token>"`, das
 * Studio-CSS zeigt danach Größe und ein Badge. Der Trigger des
 * Format-Dropdowns zeigt die aktive Stufe, z. B. „Display 2XL · 72“.
 */

import { entryForNode, findTarget, validToken } from "./editor-access";
import { TOKENS, contextOf } from "./scale";
import { TiptapEditor } from "./tiptap";

export const TRIGGER_SELECTOR = "[data-contextual-toolbar] .ds-single-select__trigger";

export function markNodeViews(editor: TiptapEditor): void {
  editor.state.doc.descendants((node, pos) => {
    if (!contextOf(node.type.name)) return true;
    const dom = editor.view.nodeDOM(pos);
    if (!(dom instanceof HTMLElement)) return false;
    const token = validToken(node);
    if (token && dom.dataset.sbt !== token) dom.dataset.sbt = token;
    if (!token && dom.dataset.sbt) delete dom.dataset.sbt;
    return false;
  });
}

export function syncTriggerLabel(editor: TiptapEditor | null, root: ParentNode = document): void {
  const trigger = root.querySelector<HTMLElement>(TRIGGER_SELECTOR);
  if (!editor || !trigger) return;
  const target = findTarget(editor);
  const entry = target ? entryForNode(target.node) : null;
  const label = entry ? `${entry.label} · ${entry.px}` : "";
  if (trigger.dataset.sbtLabel !== label) trigger.dataset.sbtLabel = label;
}

export function studioCss(hideNativeOptions: boolean): string {
  const tokenRules = [...TOKENS.values()].map(
    (entry) =>
      `.ProseMirror [data-sbt="${entry.apply.token}"] [data-node-view-content]` +
      `{font-size:${entry.px}px!important;line-height:${entry.lh}px!important}`,
  );
  return [
    ...tokenRules,
    ".ProseMirror [data-sbt]{position:relative}",
    ".ProseMirror [data-sbt]::after{content:attr(data-sbt);position:absolute;inset-inline-end:0;top:0;transform:translateY(-100%);" +
      "font:600 10px/16px Inter,sans-serif;padding:0 6px;border-radius:4px;background:#303c49;color:#fff;pointer-events:none}",
    // attr() liest nur Attribute des eigenen Elements → Label als ::after am
    // Trigger, natives Label ausblenden, Chevron per order ans Ende.
    '.ds-single-select__trigger[data-sbt-label]:not([data-sbt-label=""]){display:flex;align-items:center}',
    '.ds-single-select__trigger[data-sbt-label]:not([data-sbt-label=""]) .ds-single-select__button-value{display:none}',
    '.ds-single-select__trigger[data-sbt-label]:not([data-sbt-label=""])::after{content:attr(data-sbt-label);order:1;flex:1;' +
      "text-align:start;margin-inline-start:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    '.ds-single-select__trigger[data-sbt-label]:not([data-sbt-label=""]) .ds-single-select__icon--trailing{order:2}',
    ".sbt-group{padding:8px 12px 4px;font:600 10px/16px Inter,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#74747b}",
    ".sbt-option-meta{margin-inline-start:8px;color:#74747b;font-variant-numeric:tabular-nums}",
    hideNativeOptions ? '[data-sbt-augmented] [role="option"]:not([data-sbt-key]){display:none}' : "",
  ].join("\n");
}
