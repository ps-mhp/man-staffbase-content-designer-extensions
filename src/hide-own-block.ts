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
 * Blendet den eigenen Baustein in der Blockauswahl des Content Designers aus.
 *
 * Der Baustein existiert nur, weil Studio ihn verlangt: Der Designer lädt die
 * Bundles aller Widgets nacheinander und wartet bei jedem bis zu 5 s auf
 * `defineBlock` — ein Widget ohne Baustein hielte jedes nach ihm um diese Zeit
 * auf. Einzufügen gibt es aber nichts, deshalb verschwindet er aus der Liste
 * „Block auswählen“ des Elements „Eigener Block“. Die Optionen tragen nur ihr
 * Label als Text, kein Attribut, an dem eine CSS-Regel ansetzen könnte.
 */

import { guarded } from "./studio";

const OPTION_SELECTOR = '[role="option"]';

function hideMatching(root: Element, label: string): void {
  const candidates = root.matches(OPTION_SELECTOR) ? [root] : [...root.querySelectorAll(OPTION_SELECTOR)];
  for (const option of candidates) {
    if (option instanceof HTMLElement && !option.hidden && option.textContent?.trim() === label) {
      option.hidden = true;
      option.style.display = "none";
    }
  }
}

/** @returns Beendet das Ausblenden. */
export function startHidingOwnBlock(label: string): () => void {
  const observer = new MutationObserver((mutations) =>
    guarded("Baustein ausblenden", () => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          // Ein neuer Textknoten in einer bestehenden Option zählt wie eine neue Option.
          const element = node instanceof Element ? node : node.parentElement?.closest(OPTION_SELECTOR);
          if (element) hideMatching(element, label);
        }
      }
    }),
  );
  observer.observe(document.body, { childList: true, subtree: true });
  return () => observer.disconnect();
}
