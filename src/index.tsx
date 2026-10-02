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
 * Erweitert den Content Designer in Studio — ohne eigenen Inhalt im Frontend.
 *
 * Der Weg über ein Widget ist nur das Vehikel: Staffbase lädt registrierte
 * Widget-Bundles in Studio in dasselbe Dokument wie den Editor, und dort kommt
 * der Code an die TipTap-Instanz. Was er dort tut, steht in `typo-scale/`.
 *
 * Wann Studio die Bundles lädt, bestimmt Studio: nicht beim Öffnen einer
 * Seite, sondern erst, wenn der Designer die Liste der eigenen Blöcke braucht
 * (Element „Eigener Block“ einfügen oder bearbeiten). Danach bleiben sie bis
 * zum nächsten Neuladen des Browser-Tabs aktiv. Live geprüft am 02.10.2026.
 */

import { BlockDefinition, BlockFactory, ExternalBlockDefinition } from "widget-sdk";

import { startWidget } from "@shared/dev-mode/start-widget";
import { configurationSchema, uiSchema } from "./configuration-schema";
import { startHidingOwnBlock } from "./hide-own-block";
import { guarded, isDisabled, isStudioPage } from "./studio";
import { startTypoScale } from "./typo-scale/start-typo-scale";
import icon from "../resources/content-designer-extensions.svg";
import pkg from "../package.json";

export const WIDGET_NAME = "content-designer-extensions";
export const BLOCK_LABEL = "Content-Designer-Erweiterungen";

/** Der Baustein rendert nichts: er ist zum Einfügen nicht gedacht. */
const factory: BlockFactory = (BaseBlockClass, _widgetApi) => {
  return class ContentDesignerExtensionsBlock extends BaseBlockClass {
    public renderBlock(container: HTMLElement): void {
      container.replaceChildren();
    }
  };
};

const blockDefinition: BlockDefinition = {
  name: WIDGET_NAME,
  factory: factory,
  attributes: [],
  blockLevel: "block",
  configurationSchema: configurationSchema,
  uiSchema: uiSchema,
  label: BLOCK_LABEL,
  iconUrl: icon,
};

const externalBlockDefinition: ExternalBlockDefinition = {
  blockDefinition,
  author: pkg.author,
  version: pkg.version,
};

/** Startet die Erweiterungen, wenn dieser Browser-Tab Studio ist. */
export function startExtensions(): void {
  if (!isStudioPage() || isDisabled()) return;
  guarded("Baustein ausblenden", () => startHidingOwnBlock(BLOCK_LABEL));
  guarded("Typo-Skala", () => startTypoScale());
}

/**
 * Die Erweiterungen starten beim Anmelden, nicht beim Laden: läuft ein
 * lokaler Entwicklungsserver, übernimmt dessen Bundle, und nur eines von
 * beiden darf das Format-Dropdown erweitern.
 *
 * Angemeldet wird trotzdem ein Baustein. Studio lädt die Widgets nacheinander
 * und wartet bei jedem bis zu 5 s auf `defineBlock`; ohne Anmeldung stünde
 * jedes Widget danach so lange still.
 */
if (typeof window.defineBlock === "function") {
  void startWidget({
    name: WIDGET_NAME,
    version: pkg.version,
    register: () => {
      startExtensions();
      window.defineBlock(externalBlockDefinition);
    },
  });
}
