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
 * Wann die Erweiterungen laufen dürfen, und wie ein Fehler darin Studio
 * nicht blockiert.
 *
 * Staffbase lädt jedes installierte Widget auch in die Leser-App, für jede
 * Leserin und jeden Leser. Dort hat dieses Widget nichts zu tun; es läuft nur
 * unter `/studio/`.
 */

/** Schalter in `localStorage`, der die Erweiterungen im eigenen Browser abschaltet. */
export const KILL_SWITCH_KEY = "sbt-typo-scale";
export const KILL_SWITCH_OFF = "off";

const LOG_PREFIX = "[sbt]";

export function isStudioPage(location: Location = window.location): boolean {
  return location.pathname.startsWith("/studio/");
}

/**
 * Abgeschaltet per `localStorage.setItem("sbt-typo-scale", "off")`, etwa zur
 * Fehlersuche oder wenn ein Studio-Release die Erweiterung bricht.
 */
export function isDisabled(): boolean {
  try {
    return window.localStorage.getItem(KILL_SWITCH_KEY) === KILL_SWITCH_OFF;
  } catch {
    // Gesperrter Speicher (etwa im privaten Modus) schaltet nichts ab.
    return false;
  }
}

const reported = new Set<string>();

/**
 * Führt `run` aus und fängt jeden Fehler ab.
 *
 * Die Erweiterung hängt an nicht dokumentierten Interna von Studio; ändern
 * die sich, darf das nie den Editor anhalten. Gemeldet wird je Stelle nur
 * einmal — der Beobachter läuft bei jeder DOM-Änderung und würde die Konsole
 * sonst fluten.
 */
export function guarded<T>(label: string, run: () => T): T | undefined {
  try {
    return run();
  } catch (error) {
    if (!reported.has(label)) {
      reported.add(label);
      console.error(`${LOG_PREFIX} ${label} fehlgeschlagen — Studio läuft ohne diesen Teil weiter.`, error);
    }
    return undefined;
  }
}
