# content-designer-extensions

Staffbase-Custom-Widget **„Content-Designer-Erweiterungen“** ohne Frontend-Zweck:
Es erweitert den Content Designer in Studio. Derzeit enthält es die
**MAN-Typo-Skala** — das Userscript `staffbase-typo-scale.user.js` 0.1.0 aus der
Recherche „staffbase-editor-upgrade“ (Briefing 06), als Widget verpackt.

Die Skala ergänzt das Format-Auswahlfeld von Title- und Text-Element um 13
Stufen und speichert eine Zusatzstufe als Präfix der Block-ID
(`sbt-<token>--<uuid>`). Staffbase rendert die ID als `data-c13y-id`, das
Safe-CSS gestaltet sie. Ohne Safe-CSS und Theme-Typografie sehen Leser:innen
die Zusatzstufen nicht (Briefing, Abschnitt 1).

| Datei | Inhalt |
| --- | --- |
| `src/typo-scale/scale.ts` | Skala; `key`/`token` sind Teil gespeicherter Inhalte |
| `src/typo-scale/id-codec.ts` | `parseId`, `withToken` |
| `src/typo-scale/editor-access.ts` | Ziel-Blöcke finden, Stufe anwenden |
| `src/typo-scale/preview.ts` | `data-sbt`, Trigger-Label, Studio-CSS |
| `src/typo-scale/dropdown.ts` | Format-Dropdown erweitern |
| `src/typo-scale/save-guard.ts` | Payload vor `saveContent`/`preview` bereinigen |
| `src/typo-scale/start-typo-scale.ts` | Beobachter, Editor-Bindung, `window.__sbtTypoScale` |
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

Abschalten im eigenen Browser: `localStorage.setItem("sbt-typo-scale", "off")`.

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
