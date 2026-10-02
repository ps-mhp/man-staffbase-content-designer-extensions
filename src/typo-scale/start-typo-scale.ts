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
 * Startet die Typo-Skala im Content Designer (Briefing 2.1, Schritte ②–⑦).
 *
 * Ein MutationObserver auf `<body>` bindet jeden neu geöffneten Editor —
 * Studio ist eine Single-Page-App, ein Seitenwechsel bringt eine neue
 * TipTap-Instanz — und erweitert jedes Format-Dropdown, sobald es erscheint.
 */

import { guarded } from "../studio";
import { applyEntry } from "./editor-access";
import { LISTBOX_SELECTOR, augmentListbox } from "./dropdown";
import { parseId, withToken } from "./id-codec";
import { markNodeViews, studioCss, syncTriggerLabel } from "./preview";
import { installSaveGuard, sanitizePayload } from "./save-guard";
import { ALL_ENTRIES, SCALE } from "./scale";
import { TiptapEditor, getEditor } from "./tiptap";

export const STYLE_ID = "sbt-typo-scale";

export interface TypoScaleOptions {
  /** Native Einträge ausblenden, weil die Skala sie vollständig abbildet. */
  readonly hideNativeOptions?: boolean;
  /** Payload vor dem Speichern bereinigen (unbekannte Tokens entfernen). */
  readonly saveGuard?: boolean;
}

/** Für Fehlersuche und Smoke-Test in der Browser-Konsole erreichbar. */
interface DebugHandle {
  SCALE: typeof SCALE;
  parseId: typeof parseId;
  withToken: typeof withToken;
  sanitizePayload: typeof sanitizePayload;
  applyEntry(key: string): void;
}

declare global {
  interface Window {
    __sbtTypoScale?: DebugHandle;
  }
}

/** @returns Hält die Skala wieder an (Beobachter, Editor-Bindung, Stylesheet). */
export function startTypoScale(options: TypoScaleOptions = {}): () => void {
  const { hideNativeOptions = true, saveGuard = true } = options;
  // Nur der offene Editor bleibt gebunden: ein Seitenwechsel zerstört den
  // alten, und eine Referenz darauf hielte ihn samt Dokument im Speicher.
  let bound: { readonly editor: TiptapEditor; readonly unbind: () => void } | null = null;

  const bindEditor = (): void => {
    const editor = getEditor();
    if (!editor || bound?.editor === editor) return;
    bound?.unbind();
    let frame = 0;
    const schedule = (): void => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() =>
        guarded("Vorschau", () => {
          markNodeViews(editor);
          syncTriggerLabel(getEditor());
        }),
      );
    };
    editor.on("transaction", schedule);
    editor.on("selectionUpdate", schedule);
    bound = {
      editor,
      unbind: () => {
        cancelAnimationFrame(frame);
        guarded("Editor lösen", () => {
          editor.off("transaction", schedule);
          editor.off("selectionUpdate", schedule);
        });
      },
    };
    if (saveGuard) guarded("Save-Guard", () => installSaveGuard(editor));
    schedule();
  };

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = studioCss(hideNativeOptions);
  document.head.append(style);

  const observer = new MutationObserver((mutations) => {
    guarded("Editor binden", bindEditor);
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;
        const listbox = node.matches(LISTBOX_SELECTOR) ? node : node.querySelector<HTMLElement>(LISTBOX_SELECTOR);
        if (listbox) guarded("Dropdown erweitern", () => augmentListbox(listbox, getEditor));
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  guarded("Editor binden", bindEditor);

  window.__sbtTypoScale = {
    SCALE,
    parseId,
    withToken,
    sanitizePayload,
    applyEntry: (key) => {
      const entry = ALL_ENTRIES.find((candidate) => candidate.key === key);
      const editor = getEditor();
      if (entry && editor) applyEntry(editor, entry);
    },
  };

  return () => {
    observer.disconnect();
    bound?.unbind();
    bound = null;
    style.remove();
    delete window.__sbtTypoScale;
  };
}
