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

import { installSaveGuard, sanitizePayload } from "./save-guard";
import { TiptapEditor } from "./tiptap";

/** Ein Inhalt, wie Studio ihn in `POST …/draft` schickt (gekürzt). */
function content() {
  return {
    blocks: {
      "sbt-body-l--p1": { type: "paragraph" },
      "sbt-display-2xl--t1": { type: "title" },
      // Token passt nicht zum Typ: nach nativem Wechsel Absatz → H2.
      "sbt-body-s--h1": { type: "bigHeading" },
      // Token, den die Skala nicht kennt.
      "sbt-giant--p2": { type: "paragraph" },
      c1: { type: "textContainer", children: ["sbt-body-l--p1", "sbt-body-s--h1", "sbt-giant--p2"] },
    },
    content: ["sbt-display-2xl--t1", "c1", "sbt-giant--p2"],
  };
}

describe("sanitizePayload", () => {
  it("behält gültige Tokens und entfernt unbekannte und falsch platzierte — auch in Verweisen", () => {
    const result = sanitizePayload(content());

    expect(Object.keys(result.blocks).sort()).toEqual(["c1", "h1", "p2", "sbt-body-l--p1", "sbt-display-2xl--t1"]);
    expect(result.blocks.c1).toEqual({ type: "textContainer", children: ["sbt-body-l--p1", "h1", "p2"] });
    expect(result.content).toEqual(["sbt-display-2xl--t1", "c1", "p2"]);
  });

  it("findet Inhalte in jeder Tiefe des Payloads und lässt den Rest unverändert", () => {
    const payload = { contents: { de_DE: { content: content(), title: "Seite" } }, meta: [1, "x"] };

    const result = sanitizePayload(payload);

    expect(result.contents.de_DE.title).toBe("Seite");
    expect(result.contents.de_DE.content.content).toEqual(["sbt-display-2xl--t1", "c1", "p2"]);
    expect(result.meta).toEqual([1, "x"]);
  });

  it("gibt einen sauberen Inhalt als dasselbe Objekt zurück", () => {
    const clean = { blocks: { a: { type: "paragraph" } }, content: ["a"] };
    expect(sanitizePayload(clean)).toBe(clean);
  });

  it("ändert den Payload des Aufrufers nicht", () => {
    const payload = content();
    sanitizePayload(payload);
    expect(payload).toEqual(content());
  });
});

type ApiCall = (...args: unknown[]) => unknown;

interface FakePages {
  drafts: { saveContent: ApiCall };
  preview?: ApiCall;
}

describe("installSaveGuard", () => {
  function editorWith(pages: unknown): TiptapEditor {
    return {
      extensionManager: { extensions: [{ name: "configuration", options: { apiClient: { pages } } }] },
    } as unknown as TiptapEditor;
  }

  it("bereinigt, was Studio speichert und in der Vorschau rendert", () => {
    const saveContent = jest.fn().mockReturnValue("saved");
    const preview = jest.fn().mockReturnValue("previewed");
    const pages: FakePages = { drafts: { saveContent }, preview };

    installSaveGuard(editorWith(pages));
    const saved = pages.drafts.saveContent("page-1", { content: content() }, "signal");
    const previewed = pages.preview?.("page-1", { content: content() }, { q: 1 }, "signal");

    expect(saved).toBe("saved");
    expect(previewed).toBe("previewed");
    expect(saveContent.mock.calls[0][0]).toBe("page-1");
    expect(saveContent.mock.calls[0][1].content.content).toEqual(["sbt-display-2xl--t1", "c1", "p2"]);
    expect(saveContent.mock.calls[0][2]).toBe("signal");
    expect(preview.mock.calls[0][1].content.content).toEqual(["sbt-display-2xl--t1", "c1", "p2"]);
    expect(preview.mock.calls[0][2]).toEqual({ q: 1 });
  });

  it("legt sich nur einmal um denselben Client", () => {
    const saveContent = jest.fn();
    const pages: FakePages = { drafts: { saveContent } };

    installSaveGuard(editorWith(pages));
    const first = pages.drafts.saveContent;
    installSaveGuard(editorWith(pages));

    expect(pages.drafts.saveContent).toBe(first);
  });

  it("tut nichts, wenn Studio keinen API-Client mehr anbietet", () => {
    expect(() => installSaveGuard(editorWith(undefined))).not.toThrow();
    expect(() => installSaveGuard({ extensionManager: { extensions: [] } } as unknown as TiptapEditor)).not.toThrow();
  });
});
