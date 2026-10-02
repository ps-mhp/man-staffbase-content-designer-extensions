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

import { parseId, withToken } from "./id-codec";

const UUID = "7bca7d25-2d32-494d-a185-d25d0e5de097";

describe("parseId", () => {
  it("trennt Token und ursprüngliche ID", () => {
    expect(parseId(`sbt-display-2xl--${UUID}`)).toEqual({ token: "display-2xl", baseId: UUID });
  });

  it("liest eine ID ohne Präfix als Basis ohne Token", () => {
    expect(parseId(UUID)).toEqual({ token: null, baseId: UUID });
  });

  it("nimmt ein Präfix ohne Trenner „--“ nicht als Token", () => {
    expect(parseId("sbt-body-l")).toEqual({ token: null, baseId: "sbt-body-l" });
  });

  it("verträgt fehlende und fremde Werte", () => {
    expect(parseId(undefined)).toEqual({ token: null, baseId: null });
    expect(parseId(42)).toEqual({ token: null, baseId: null });
  });
});

describe("withToken", () => {
  it("setzt einen Token vor die ID", () => {
    expect(withToken(UUID, "body-l")).toBe(`sbt-body-l--${UUID}`);
  });

  it("ersetzt einen vorhandenen Token, statt ihn zu stapeln", () => {
    expect(withToken(`sbt-body-l--${UUID}`, "body-xs")).toBe(`sbt-body-xs--${UUID}`);
  });

  it("entfernt den Token für eine native Stufe", () => {
    expect(withToken(`sbt-display-m--${UUID}`, undefined)).toBe(UUID);
  });

  it("erzeugt eine neue UUID, wenn der Block noch keine ID hat", () => {
    expect(withToken(null, "body-s")).toMatch(/^sbt-body-s--[0-9a-f-]{36}$/);
  });
});
