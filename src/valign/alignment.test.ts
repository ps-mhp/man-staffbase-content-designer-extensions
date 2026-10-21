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

import {
  VALIGN_TOKENS,
  choiceOfColumnToken,
  columnToken,
  containerToken,
  levelOfContainerToken,
} from "./alignment";

describe("alignment", () => {
  it("lässt „oben“ am Container und „wie Container“ an der Spalte tokenfrei", () => {
    expect(containerToken("top")).toBeUndefined();
    expect(columnToken("inherit")).toBeUndefined();
    expect(columnToken("top")).toBe("col-valign-top");
    expect(containerToken("center")).toBe("valign-center");
  });

  it("liest Tokens zurück und behandelt fremde als Standard", () => {
    expect(levelOfContainerToken("valign-bottom")).toBe("bottom");
    expect(levelOfContainerToken("col-valign-center")).toBe("top");
    expect(levelOfContainerToken(null)).toBe("top");
    expect(choiceOfColumnToken("col-valign-center")).toBe("center");
    expect(choiceOfColumnToken("valign-center")).toBe("inherit");
    expect(choiceOfColumnToken(null)).toBe("inherit");
  });

  it("bindet jedes Token an genau seinen Node-Typ", () => {
    expect([...VALIGN_TOKENS]).toEqual([
      ["valign-center", "container"],
      ["valign-bottom", "container"],
      ["col-valign-top", "column"],
      ["col-valign-center", "column"],
      ["col-valign-bottom", "column"],
    ]);
  });
});
