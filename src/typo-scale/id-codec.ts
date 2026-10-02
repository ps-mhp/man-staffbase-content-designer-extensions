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
 * Die Stufe steht als Präfix in der Block-ID (Briefing 2.2):
 *
 *   sbt-display-2xl--7bca7d25-2d32-494d-a185-d25d0e5de097
 *   │   │           └─ ursprüngliche Block-UUID (bleibt eindeutig)
 *   │   └───────────── Token: a–z, 0–9, „-“, nie „--“
 *   └───────────────── Namespace
 *
 * Staffbase übernimmt die ID unverändert als `data-c13y-id` ins Frontend, wo
 * das Safe-CSS sie per `[data-c13y-id^="sbt-<token>--"]` gestaltet.
 */

const ID_PREFIX = "sbt-";
const ID_RE = /^sbt-([a-z0-9-]+?)--(.+)$/;

export interface ParsedId {
  readonly token: string | null;
  readonly baseId: string | null;
}

export function parseId(id: unknown): ParsedId {
  const match = typeof id === "string" ? ID_RE.exec(id) : null;
  if (match) return { token: match[1], baseId: match[2] };
  return { token: null, baseId: typeof id === "string" ? id : null };
}

/** Die ID mit genau diesem Token, oder ohne Token bei `undefined`. */
export function withToken(id: unknown, token: string | undefined): string {
  const base = parseId(id).baseId || crypto.randomUUID();
  return token ? `${ID_PREFIX}${token}--${base}` : base;
}
