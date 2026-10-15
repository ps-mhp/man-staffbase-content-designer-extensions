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
 * Die MAN-Typo-Skala (Briefing 2.3), unverändert aus dem Userscript
 * `staffbase-typo-scale.user.js` 0.1.0.
 *
 * `key` und `token` sind Teil gespeicherter Inhalte — nie umbenennen, sonst
 * müssen alle Seiten migriert werden.
 *
 * - `apply.node`   Ziel-Node im ProseMirror-Schema
 * - `apply.format` nur `title`: natives Format (big | medium | small)
 * - `apply.token`  Präfix der Block-ID. Fehlt er, ist die Stufe nativ
 *                  (Theme-Typografie).
 * - `lh`           Zeilenhöhe als **Faktor**, nicht in Pixeln: so, wie Craft
 *                  sie führt (`--craft-gl-font-line-height-2` = 1.3 für
 *                  Display und Überschriften, `-3` = 1.5 für Fliesstext).
 *                  Das Frontend-CSS in `man-theme` setzt dieselben
 *                  Craft-Tokens — ein Pixelwert hier liefe sonst gegen die
 *                  Craft-Stufe dort auseinander (Display stand auf Faktor
 *                  1,2, Craft führt 1,3: bei 72px sind das 8px Unterschied
 *                  je Zeile).
 */

export type ScaleContext = "title" | "text";

/** Craft `--craft-gl-font-line-height-2`: Display und Überschriften. */
const LH_HEAD = 1.3;

/** Craft `--craft-gl-font-line-height-3`: Fliesstext. */
const LH_BODY = 1.5;

export interface ScaleEntry {
  readonly key: string;
  readonly label: string;
  readonly px: number;
  readonly lh: number;
  readonly apply: {
    readonly node: string;
    readonly format?: "big" | "medium" | "small";
    readonly token?: string;
  };
}

export const SCALE: Readonly<Record<ScaleContext, readonly ScaleEntry[]>> = {
  title: [
    { key: "display-2xl", label: "Display 2XL", px: 72, lh: LH_HEAD, apply: { node: "title", format: "big", token: "display-2xl" } },
    { key: "display-xl", label: "Display XL", px: 64, lh: LH_HEAD, apply: { node: "title", format: "big", token: "display-xl" } },
    { key: "display-l", label: "Display L", px: 56, lh: LH_HEAD, apply: { node: "title", format: "big" } },
    { key: "display-m", label: "Display M", px: 48, lh: LH_HEAD, apply: { node: "title", format: "medium", token: "display-m" } },
    { key: "display-s", label: "Display S", px: 40, lh: LH_HEAD, apply: { node: "title", format: "medium" } },
    { key: "h1", label: "H1", px: 32, lh: LH_HEAD, apply: { node: "title", format: "small" } },
  ],
  text: [
    { key: "h2", label: "H2", px: 28, lh: LH_HEAD, apply: { node: "bigHeading" } },
    { key: "h3", label: "H3", px: 24, lh: LH_HEAD, apply: { node: "mediumHeading" } },
    { key: "h4", label: "H4", px: 20, lh: LH_HEAD, apply: { node: "smallHeading" } },
    { key: "body-l", label: "Body L", px: 18, lh: LH_BODY, apply: { node: "paragraph", token: "body-l" } },
    { key: "body-m", label: "Body M", px: 16, lh: LH_BODY, apply: { node: "paragraph" } },
    { key: "body-s", label: "Body S", px: 14, lh: LH_BODY, apply: { node: "paragraph", token: "body-s" } },
    { key: "body-xs", label: "Body XS", px: 12, lh: LH_BODY, apply: { node: "paragraph", token: "body-xs" } },
  ],
};

export const ALL_ENTRIES: readonly ScaleEntry[] = [...SCALE.title, ...SCALE.text];

/** Stufen mit Token, nach Token. */
export const TOKENS: ReadonlyMap<string, ScaleEntry> = new Map(
  ALL_ENTRIES.flatMap((entry) => (entry.apply.token ? [[entry.apply.token, entry] as const] : [])),
);

const TEXT_NODES: ReadonlySet<string> = new Set(["paragraph", "bigHeading", "mediumHeading", "smallHeading"]);

/** Welche Skala zu einem Node-Typ gehört; `null` für alles andere. */
export function contextOf(nodeName: string): ScaleContext | null {
  if (nodeName === "title") return "title";
  return TEXT_NODES.has(nodeName) ? "text" : null;
}
