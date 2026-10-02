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

import { startHidingOwnBlock } from "./hide-own-block";

const LABEL = "Content-Designer-Erweiterungen";

/** MutationObserver meldet nach dem aktuellen Microtask. */
const flush = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0));

describe("startHidingOwnBlock", () => {
  let stop: () => void = () => undefined;
  afterEach(() => {
    stop();
    document.body.innerHTML = "";
  });

  it("blendet die eigene Option in der Blockauswahl aus, andere nicht", async () => {
    stop = startHidingOwnBlock(LABEL);

    document.body.innerHTML = `
      <div role="listbox">
        <div role="option">Tabelle</div>
        <div role="option"> ${LABEL} </div>
      </div>`;
    await flush();

    const [table, own] = document.querySelectorAll<HTMLElement>('[role="option"]');
    expect(own.hidden).toBe(true);
    expect(table.hidden).toBe(false);
  });

  it("erfasst eine Option, deren Text erst nachträglich eingesetzt wird", async () => {
    document.body.innerHTML = '<div role="option"></div>';
    stop = startHidingOwnBlock(LABEL);

    const option = document.querySelector<HTMLElement>('[role="option"]') as HTMLElement;
    option.append(document.createTextNode(LABEL));
    await flush();

    expect(option.hidden).toBe(true);
  });
});
