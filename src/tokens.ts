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
 * Alle Tokens, die die Erweiterungen in Block-IDs schreiben, mit dem Node-Typ,
 * an dem sie allein gelten. Der Save-Guard prüft dagegen.
 */

import { TOKENS } from "./typo-scale/scale";
import { VALIGN_TOKENS } from "./valign/alignment";

export const TOKEN_NODES: ReadonlyMap<string, string> = new Map<string, string>([
  ...[...TOKENS].map(([token, entry]) => [token, entry.apply.node] as const),
  ...VALIGN_TOKENS,
]);
