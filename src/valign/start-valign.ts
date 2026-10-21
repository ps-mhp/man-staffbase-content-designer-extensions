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
 * Startet die vertikale Ausrichtung im Content Designer.
 *
 * Wie bei der Typo-Skala bindet ein MutationObserver auf `<body>` jeden neu
 * geöffneten Editor und ergänzt jeden Layout-Tab, sobald er erscheint.
 * Jede Transaktion gleicht danach Vorschau und Dialog mit dem Dokument ab.
 */

import { guarded } from "../studio";
import { installSaveGuard } from "../save-guard";
import { TiptapEditor, getEditor } from "../tiptap";
import { ColumnChoice, Level } from "./alignment";
import { augmentDialogs, renderSections } from "./dialog";
import { ContainerState, selectedContainer, setColumnChoice, setContainerLevel } from "./editor-access";
import { markColumns, studioCss } from "./preview";

export const VALIGN_STYLE_ID = "sbt-valign";

export interface ValignOptions {
  /** Payload vor dem Speichern bereinigen (unbekannte Tokens entfernen). */
  readonly saveGuard?: boolean;
}

/** Für Fehlersuche und Smoke-Test in der Browser-Konsole erreichbar. */
interface DebugHandle {
  selected(): ContainerState | null;
  setContainerLevel(level: Level): void;
  setColumnChoice(index: number, choice: ColumnChoice): void;
}

declare global {
  interface Window {
    __sbtValign?: DebugHandle;
  }
}

/** @returns Hält die Erweiterung wieder an (Beobachter, Editor-Bindung, Stylesheet). */
export function startValign(options: ValignOptions = {}): () => void {
  const { saveGuard = true } = options;
  let bound: { readonly editor: TiptapEditor; readonly unbind: () => void } | null = null;

  const bindEditor = (): void => {
    const editor = getEditor();
    if (!editor || bound?.editor === editor) return;
    bound?.unbind();
    let frame = 0;
    const schedule = (): void => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() =>
        guarded("Ausrichtung abgleichen", () => {
          markColumns(editor);
          renderSections(editor);
        }),
      );
    };
    editor.on("transaction", schedule);
    bound = {
      editor,
      unbind: () => {
        cancelAnimationFrame(frame);
        guarded("Ausrichtung lösen", () => editor.off("transaction", schedule));
      },
    };
    if (saveGuard) guarded("Save-Guard", () => installSaveGuard(editor));
    schedule();
  };

  const style = document.createElement("style");
  style.id = VALIGN_STYLE_ID;
  style.textContent = studioCss();
  document.head.append(style);

  const observer = new MutationObserver(() => {
    guarded("Ausrichtung: Editor binden", bindEditor);
    guarded("Ausrichtung: Dialog ergänzen", () => augmentDialogs(getEditor));
  });
  observer.observe(document.body, { childList: true, subtree: true });
  guarded("Ausrichtung: Editor binden", bindEditor);

  const withSelected = (run: (editor: TiptapEditor, container: ContainerState) => void): void => {
    const editor = getEditor();
    const container = editor ? selectedContainer(editor) : null;
    if (editor && container) run(editor, container);
  };
  window.__sbtValign = {
    selected: () => {
      const editor = getEditor();
      return editor ? selectedContainer(editor) : null;
    },
    setContainerLevel: (level) => withSelected((editor, c) => setContainerLevel(editor, c.baseId, level)),
    setColumnChoice: (index, choice) => withSelected((editor, c) => setColumnChoice(editor, c.baseId, index, choice)),
  };

  return () => {
    observer.disconnect();
    bound?.unbind();
    bound = null;
    style.remove();
    delete window.__sbtValign;
  };
}
