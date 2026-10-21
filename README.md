# content-designer-extensions

Staffbase-Custom-Widget **„Content-Designer-Erweiterungen“** ohne Frontend-Zweck:
Es erweitert den Content Designer in Studio um

- die **MAN-Typo-Skala** — das Userscript `staffbase-typo-scale.user.js` 0.1.0
  aus der Recherche „staffbase-editor-upgrade“ (Briefing 06), als Widget
  verpackt, und
- die **vertikale Ausrichtung in Container-Spalten** (Abschnitt unten).

Beide speichern ihre Einstellung auf dieselbe Weise: als Präfix der Block-ID.

Die Skala ergänzt das Format-Auswahlfeld von Title- und Text-Element um 13
Stufen und speichert eine Zusatzstufe als Präfix der Block-ID
(`sbt-<token>--<uuid>`). Staffbase rendert die ID als `data-c13y-id`, das
Custom CSS des Content Designers gestaltet sie. Ohne dieses CSS und die
Theme-Typografie sehen Leser:innen die Zusatzstufen nicht (Briefing,
Abschnitt 1).

Dieses CSS ist **kein freies Textfeld**, sondern wird aus dem Schwesterrepo
[`man-theme`](https://github.com/ps-mhp/man-theme) gebaut:
`dist/man-designer.css` → Content Designer → Custom CSS. Von Hand ins Feld
geschriebene Regeln überschreibt der nächste `tools/push.js` dort. Die
Token-Regeln gehören deshalb nach `man-theme/src/02-typography/`, und sie
müssen die Basisregeln desselben Blattes überstimmen —
`[data-c13y-component="paragraph-block"]` trägt dort `font: var(--man-body)
!important`, was Größe **und** Zeilenhöhe jedes Absatzes festlegt. Nötig sind
also zwei Attribute im Selektor (Spezifität 0,2,0) plus `!important`.

Die Werte sind die Craft-Skala: `px` entspricht
`--craft-pp-font-size-<stufe>`, `lh` ist der Craft-Faktor
(1,3 Display/Überschrift · 1,5 Fliesstext). Beide Seiten müssen dieselbe
Stufe nennen, sonst zeigt die Vorschau im Editor etwas anderes als das
Frontend.

## Vertikale Ausrichtung in Container-Spalten

Spalten eines Containers sind im Frontend gleich hoch (CSS-Grid, `stretch`),
ihr Inhalt steht aber immer oben. Die Erweiterung ergänzt im Dialog
**Container bearbeiten → Layout** unter den Layout-Schaltflächen einen
Abschnitt **„Vertikale Ausrichtung“**: oben · mitte · unten für den Container,
bei mehr als einer Spalte zusätzlich je Spalte „wie Container“ · oben · mitte ·
unten. Die Spalte übersteuert den Container.

| Ebene | Tokens (`sbt-<token>--<uuid>`) |
| --- | --- |
| Container | `valign-center`, `valign-bottom` (oben = kein Token) |
| Spalte | `col-valign-top`, `col-valign-center`, `col-valign-bottom` (wie Container = kein Token) |

Die Frontend-Regeln stehen in `man-theme/src/05-contexts/_designer-valign.scss`
(Slot `designer`). Sie machen die Spalte (`column-block`) zur Flex-Spalte und
verteilen den freien Platz mit `justify-content`. Gestapelte Spalten auf Mobil
sind inhaltshoch, dort wirkt die Ausrichtung nicht — gewollt. Im Editor
zeigt `data-sbt-valign` an `[data-testid="column-background"]` dieselbe
Ausrichtung; das Hovern einer Spaltenzeile im Dialog hebt die Spalte hervor.

Die Änderung läuft als `tr.setNodeAttribute(pos, "id", …)`. `setNodeMarkup`
ersetzt den Container-Node, Studio verliert die NodeSelection und schließt den
Dialog (live geprüft).

Smoke-Test gegen die echte App (speichert nichts, nimmt per Undo zurück):
`STAFFBASE_URL=https://www.onetruck.man node scripts/smoke-valign.mjs` im
Meta-Repo. Er kopiert für das Frontend Staffbases ID-genaue `--dyn-*`-Regeln
(Spaltenbreiten) auf die neue ID — ohne sie bricht das Spaltenraster, sobald
eine ID nur im DOM geändert wird.

## Dateien

| Datei | Inhalt |
| --- | --- |
| `src/id-codec.ts` | `parseId`, `withToken` (beide Erweiterungen) |
| `src/tokens.ts` | alle bekannten Tokens mit ihrem Node-Typ |
| `src/save-guard.ts` | Payload vor `saveContent`/`preview` bereinigen |
| `src/tiptap.ts` | schmale Typen für TipTap/ProseMirror, `getEditor` |
| `src/typo-scale/scale.ts` | Skala; `key`/`token` sind Teil gespeicherter Inhalte |
| `src/typo-scale/editor-access.ts` | Ziel-Blöcke finden, Stufe anwenden |
| `src/typo-scale/preview.ts` | `data-sbt`, Trigger-Label, Studio-CSS |
| `src/typo-scale/dropdown.ts` | Format-Dropdown erweitern |
| `src/typo-scale/start-typo-scale.ts` | Beobachter, Editor-Bindung, `window.__sbtTypoScale` |
| `src/valign/alignment.ts` | Stufen, Beschriftungen, Tokens; Teil gespeicherter Inhalte |
| `src/valign/editor-access.ts` | Container finden, Stufe/Spaltenwahl setzen |
| `src/valign/preview.ts` | `data-sbt-valign`, Hervorhebung, Studio-CSS |
| `src/valign/dialog.ts` | Abschnitt im Layout-Tab |
| `src/valign/start-valign.ts` | Beobachter, Editor-Bindung, `window.__sbtValign` |
| `src/hide-own-block.ts` | eigenen Baustein in „Block auswählen“ ausblenden |
| `src/studio.ts` | nur unter `/studio/`, Kill-Switch, Fehler abfangen (`[sbt]`) |

## Wann der Code läuft

Studio lädt Widget-Bundles **nicht** beim Öffnen einer Seite, sondern erst,
wenn der Designer die Liste der eigenen Blöcke braucht (Benutzerdefinierten
Block einfügen oder bearbeiten). Dann lädt er alle registrierten Bundles
nacheinander ins Studio-Dokument und wartet bei jedem bis zu 5 s auf
`defineBlock`. Deshalb meldet das Widget einen Baustein an (der nichts rendert)
und blendet ihn in der Auswahl aus. Danach bleibt die Erweiterung bis zum
Neuladen des Tabs aktiv. Live geprüft am 02.10.2026 auf onetruck.

In der Leser-App lädt Staffbase das Bundle ebenfalls; dort tut es nichts.

Abschalten im eigenen Browser (beide Erweiterungen):
`localStorage.setItem("sbt-typo-scale", "off")`.

## Entwicklung

Entwickelt, gebaut und released wird es aus dem
Meta-Repo [`ps-mhp/man-staffbase-cms-extensions`](https://github.com/ps-mhp/man-staffbase-cms-extensions);
dieses Repo enthält nur Quellcode und das ausgelieferte Bundle unter `dist/`.

```bash
scripts/sync.sh content-designer-extensions
npm run build -- --env widget=content-designer-extensions
npm test -- src/widgets/content-designer-extensions
scripts/release.sh content-designer-extensions
```
