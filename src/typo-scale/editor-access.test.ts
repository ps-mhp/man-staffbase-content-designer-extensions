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

import { applyEntry, entryForNode, validToken } from "./editor-access";
import { fakeEditor } from "./fake-editor";
import { ALL_ENTRIES, ScaleEntry } from "./scale";

const entry = (key: string): ScaleEntry => {
  const found = ALL_ENTRIES.find((candidate) => candidate.key === key);
  if (!found) throw new Error(key);
  return found;
};

const node = (type: string, attrs: Record<string, unknown>) => ({ type: { name: type }, attrs });

describe("validToken", () => {
  it("nimmt einen Token nur am passenden Node-Typ", () => {
    expect(validToken(node("paragraph", { id: "sbt-body-l--a" }))).toBe("body-l");
    expect(validToken(node("bigHeading", { id: "sbt-body-l--a" }))).toBeNull();
    expect(validToken(node("paragraph", { id: "sbt-unknown--a" }))).toBeNull();
  });
});

describe("entryForNode", () => {
  it("erkennt Token-Stufen und native Stufen", () => {
    expect(entryForNode(node("title", { id: "sbt-display-xl--a", format: "big" }))?.key).toBe("display-xl");
    expect(entryForNode(node("title", { id: "a", format: "medium" }))?.key).toBe("display-s");
    expect(entryForNode(node("title", { id: "a", format: "small" }))?.key).toBe("h1");
    expect(entryForNode(node("mediumHeading", { id: "a" }))?.key).toBe("h3");
    expect(entryForNode(node("paragraph", { id: "a" }))?.key).toBe("body-m");
  });

  it("liest einen Title ohne Format als „big“, wie Studio", () => {
    expect(entryForNode(node("title", { id: "a" }))?.key).toBe("display-l");
  });

  it("ignoriert einen Token am falschen Typ und zeigt die native Stufe", () => {
    expect(entryForNode(node("bigHeading", { id: "sbt-body-l--a" }))?.key).toBe("h2");
  });

  it("kennt nur Title- und Text-Blöcke", () => {
    expect(entryForNode(node("image", { id: "a" }))).toBeNull();
  });
});

describe("applyEntry", () => {
  it("setzt Format und Token am Title in einer Transaktion", () => {
    const editor = fakeEditor([{ type: "title", attrs: { id: "t1", format: "small" }, pos: 0 }], 0);

    applyEntry(editor, entry("display-2xl"));

    expect(editor.blocks[0].attrs).toEqual({ id: "sbt-display-2xl--t1", format: "big" });
    expect(editor.dispatch).toHaveBeenCalledTimes(1);
    expect(editor.setNode).not.toHaveBeenCalled();
  });

  it("entfernt den Token bei einer nativen Stufe", () => {
    const editor = fakeEditor([{ type: "title", attrs: { id: "sbt-display-m--t1", format: "medium" }, pos: 0 }], 0);

    applyEntry(editor, entry("display-s"));

    expect(editor.blocks[0].attrs).toEqual({ id: "t1", format: "medium" });
  });

  it("wechselt den Blocktyp nativ, bevor es den Token setzt", () => {
    const editor = fakeEditor([{ type: "bigHeading", attrs: { id: "p1" }, pos: 3 }], 3);

    applyEntry(editor, entry("body-s"));

    expect(editor.setNode).toHaveBeenCalledWith("paragraph");
    expect(editor.blocks[0]).toMatchObject({ type: "paragraph", attrs: { id: "sbt-body-s--p1" } });
  });

  it("wirkt auf alle Text-Blöcke einer Markierung", () => {
    const editor = fakeEditor(
      [
        { type: "paragraph", attrs: { id: "a" }, pos: 1 },
        { type: "paragraph", attrs: { id: "sbt-body-xs--b" }, pos: 5 },
      ],
      1,
      5,
    );

    applyEntry(editor, entry("body-l"));

    expect(editor.blocks.map((block) => block.attrs.id)).toEqual(["sbt-body-l--a", "sbt-body-l--b"]);
  });

  it("lässt Blöcke außerhalb der Skala in Ruhe", () => {
    const editor = fakeEditor([{ type: "image", attrs: { id: "i1" }, pos: 0 }], 0);

    applyEntry(editor, entry("body-l"));

    expect(editor.dispatch).not.toHaveBeenCalled();
    expect(editor.blocks[0].attrs).toEqual({ id: "i1" });
  });
});
