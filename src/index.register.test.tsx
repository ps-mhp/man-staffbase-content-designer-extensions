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

import type { BlockDefinition, ExternalBlockDefinition } from "widget-sdk";

const mockStartWidget = jest.fn().mockResolvedValue(undefined);
const mockStartTypoScale = jest.fn(() => () => undefined);
const mockStartHiding = jest.fn(() => () => undefined);

jest.mock("@shared/dev-mode/start-widget", () => ({ startWidget: mockStartWidget }));
jest.mock("./typo-scale/start-typo-scale", () => ({ startTypoScale: mockStartTypoScale }));
jest.mock("./hide-own-block", () => ({ startHidingOwnBlock: mockStartHiding }));

interface Host {
  defineBlock: jest.Mock;
}

/** Lädt das Modul frisch und löst die Anmeldung aus, wie es `startWidget` täte. */
async function loadAndRegister(path: string): Promise<{ host: Host; definition: BlockDefinition }> {
  window.history.pushState({}, "", path);
  const host = window as unknown as Host;
  host.defineBlock = jest.fn();
  mockStartWidget.mockClear();
  mockStartTypoScale.mockClear();
  mockStartHiding.mockClear();

  jest.resetModules();
  await import("./index");

  expect(mockStartTypoScale).not.toHaveBeenCalled();
  const options = mockStartWidget.mock.calls[0][0] as { name: string; register: () => void };
  expect(options.name).toBe("content-designer-extensions");
  options.register();

  const external = host.defineBlock.mock.calls[0][0] as ExternalBlockDefinition;
  return { host, definition: external.blockDefinition };
}

describe("Anmeldung des Widgets", () => {
  afterEach(() => window.localStorage.clear());

  it("startet die Erweiterungen in Studio erst beim Anmelden und meldet einen Baustein an", async () => {
    const { host, definition } = await loadAndRegister("/studio/content/page/abc/edit");

    expect(mockStartTypoScale).toHaveBeenCalledTimes(1);
    expect(mockStartHiding).toHaveBeenCalledWith("Content-Designer-Erweiterungen");
    expect(host.defineBlock).toHaveBeenCalledTimes(1);
    expect(definition).toMatchObject({
      name: "content-designer-extensions",
      label: "Content-Designer-Erweiterungen",
      attributes: [],
    });
  });

  it("bleibt in der Leser-App untätig, meldet den Baustein aber trotzdem an", async () => {
    const { host } = await loadAndRegister("/content/page/abc");

    expect(mockStartTypoScale).not.toHaveBeenCalled();
    expect(mockStartHiding).not.toHaveBeenCalled();
    expect(host.defineBlock).toHaveBeenCalledTimes(1);
  });

  it("lässt sich im eigenen Browser per localStorage abschalten", async () => {
    window.localStorage.setItem("sbt-typo-scale", "off");

    const { host } = await loadAndRegister("/studio/content/page/abc/edit");

    expect(mockStartTypoScale).not.toHaveBeenCalled();
    expect(host.defineBlock).toHaveBeenCalledTimes(1);
  });

  it("meldet den Baustein an, auch wenn eine Erweiterung beim Start scheitert", async () => {
    mockStartTypoScale.mockImplementationOnce(() => {
      throw new Error("Studio-Interna geändert");
    });
    const error = jest.spyOn(console, "error").mockImplementation(() => undefined);

    const { host } = await loadAndRegister("/studio/content/page/abc/edit");

    expect(host.defineBlock).toHaveBeenCalledTimes(1);
    expect(error).toHaveBeenCalledWith(expect.stringContaining("[sbt] Typo-Skala"), expect.any(Error));
    error.mockRestore();
  });

  it("rendert als Baustein nichts", async () => {
    const { definition } = await loadAndRegister("/content/page/abc");
    class FakeBase extends HTMLElement {}
    const Block = definition.factory(
      FakeBase as unknown as Parameters<BlockDefinition["factory"]>[0],
      {} as Parameters<BlockDefinition["factory"]>[1],
    );
    customElements.define("content-designer-extensions-probe", Block);
    const element = new Block() as HTMLElement & { renderBlock(container: HTMLElement): void };
    const container = document.createElement("div");
    container.innerHTML = "<p>alt</p>";

    element.renderBlock(container);

    expect(container.childNodes).toHaveLength(0);
  });
});
