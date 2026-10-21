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
 * Die Stufen der vertikalen Ausrichtung und ihre Tokens in der Block-ID.
 *
 * Der Container gibt die Ausrichtung für alle seine Spalten vor, eine Spalte
 * darf sie übersteuern. „oben“ am Container ist der native Zustand und bleibt
 * tokenfrei; an der Spalte braucht „oben“ ein Token, weil es sonst einen
 * Container auf „mitte“ nicht zurücknehmen könnte.
 *
 * Tokens sind Teil gespeicherter Inhalte — nie umbenennen. Gestaltet werden
 * sie im Frontend von `man-theme` (`src/05-contexts/_designer-valign.scss`).
 */

export type Level = "top" | "center" | "bottom";

/** Was eine Spalte trägt: eine eigene Stufe oder die des Containers. */
export type ColumnChoice = Level | "inherit";

export const LEVELS: readonly Level[] = ["top", "center", "bottom"];

export const LEVEL_LABELS: Readonly<Record<Level, string>> = { top: "oben", center: "mitte", bottom: "unten" };

export const INHERIT_LABEL = "wie Container";

export const CONTAINER_NODE = "container";
export const COLUMN_NODE = "column";

const CONTAINER_TOKENS: Readonly<Record<Level, string | undefined>> = {
  top: undefined,
  center: "valign-center",
  bottom: "valign-bottom",
};

const COLUMN_TOKENS: Readonly<Record<Level, string>> = {
  top: "col-valign-top",
  center: "col-valign-center",
  bottom: "col-valign-bottom",
};

/** Token → der Node-Typ, an dem es allein gilt. */
export const VALIGN_TOKENS: ReadonlyMap<string, string> = new Map<string, string>([
  ...LEVELS.flatMap((level) => {
    const token = CONTAINER_TOKENS[level];
    return token ? [[token, CONTAINER_NODE] as const] : [];
  }),
  ...LEVELS.map((level) => [COLUMN_TOKENS[level], COLUMN_NODE] as const),
]);

export function containerToken(level: Level): string | undefined {
  return CONTAINER_TOKENS[level];
}

export function columnToken(choice: ColumnChoice): string | undefined {
  return choice === "inherit" ? undefined : COLUMN_TOKENS[choice];
}

/** Die Stufe eines Containers; alles Fremde gilt als „oben“. */
export function levelOfContainerToken(token: string | null): Level {
  return LEVELS.find((level) => token !== null && CONTAINER_TOKENS[level] === token) ?? "top";
}

/** Die Wahl einer Spalte; alles Fremde gilt als „wie Container“. */
export function choiceOfColumnToken(token: string | null): ColumnChoice {
  return LEVELS.find((level) => COLUMN_TOKENS[level] === token) ?? "inherit";
}
