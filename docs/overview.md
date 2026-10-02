# Content-Designer-Erweiterungen

Diese Erweiterung ergänzt im Content Designer von Studio das Format-Auswahlfeld
der Elemente **Titel** und **Text** um die **MAN-Typo-Skala** mit 13 Stufen —
von „Display 2XL · 72“ bis „Body XS · 12“. Sie fügen damit keinen Baustein auf
der Seite ein: Die Stufe wählen Sie direkt am Titel oder am Textabsatz, so wie
bisher „Überschrift 2“ oder „Absatz“.

| Stufe | Größe | Element |
| --- | --- | --- |
| Display 2XL | 72 px | Titel |
| Display XL | 64 px | Titel |
| Display L | 56 px | Titel |
| Display M | 48 px | Titel |
| Display S | 40 px | Titel |
| H1 | 32 px | Titel |
| H2 | 28 px | Text |
| H3 | 24 px | Text |
| H4 | 20 px | Text |
| Body L | 18 px | Text |
| Body M | 16 px | Text |
| Body S | 14 px | Text |
| Body XS | 12 px | Text |

Die Gliederung der Seite bleibt dabei unverändert: Ein Titel ist immer die
Hauptüberschrift der Seite, H2 bis H4 sind Zwischenüberschriften, Body-Stufen
sind Absätze. Die Display-Stufen ändern nur die Größe.

## Was Leser:innen sehen

Den Titel oder Absatz in der gewählten Größe. Damit das klappt, müssen in
Studio zwei Dinge eingerichtet sein, um die sich die Studio-Administration
kümmert: das Custom CSS mit der Typo-Erweiterung (Content Designer → Custom CSS)
und die Theme-Typografie (Look & Feel → Typografie). Fehlt das Custom CSS,
sehen Leser:innen bei den Zusatzstufen die normale Größe — der Inhalt selbst
bleibt korrekt.

## Was Sie im CMS-Editor sehen

- Im Format-Auswahlfeld der Toolbar erscheint die Gruppe **„MAN Typo-Skala“**
  mit Größe und Zeilenhöhe je Stufe, z. B. „Body L 18/27“. Die bisherigen
  Einträge werden dafür ausgeblendet, weil die Skala sie vollständig enthält.
- Das Auswahlfeld zeigt die aktive Stufe, z. B. „Display 2XL · 72“.
- Blöcke mit einer Zusatzstufe tragen oben rechts ein dunkles Etikett mit
  ihrer Stufe, z. B. `display-2xl` — so erkennen Sie sie auf einen Blick.

## Wann die Erweiterung bereitsteht

Studio lädt die Erweiterung nicht schon beim Öffnen einer Seite, sondern erst,
wenn Sie zum ersten Mal einen **Benutzerdefinierten Block** einfügen oder
bearbeiten. Danach steht sie auf allen Seiten bereit, bis Sie den Browser-Tab
neu laden. Wie Sie sie gezielt einschalten, steht unter „Schritt für Schritt“.
