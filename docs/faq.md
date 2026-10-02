# FAQ

**Frage:** Im Format-Auswahlfeld fehlt die Gruppe „MAN Typo-Skala“. Was tun?

Antwort: Studio lädt die Erweiterung erst, wenn ein Benutzerdefinierter Block
eingefügt oder bearbeitet wird, und vergisst sie beim Neuladen des Browser-Tabs.
Schalten Sie sie ein wie unter „Schritt für Schritt → Erweiterung einschalten“
beschrieben. Fehlt die Gruppe danach weiterhin, hat sich vermutlich Studio
geändert — melden Sie das bitte dem Team, das die Widgets betreut.

**Frage:** Kann ich die Erweiterung als Baustein auf der Seite einfügen?

Antwort: Nein. Sie hat keinen sichtbaren Inhalt und erscheint deshalb nicht in
der Liste „Block auswählen“. Sie wirkt nur im Format-Auswahlfeld von Titel und
Text.

**Frage:** Im Editor sehe ich die Stufe, auf der veröffentlichten Seite nicht.

Antwort: Dann fehlt in Studio das Custom CSS mit der Typo-Erweiterung oder ist
veraltet. Das richtet die Studio-Administration ein.

**Frage:** Auf der veröffentlichten Seite ist eine Stufe zu sehen, im Editor nicht.

Antwort: Die Erweiterung ist in Ihrem Browser-Tab noch nicht aktiv. Schalten
Sie sie ein und öffnen Sie die Seite erneut.

**Frage:** „Display L“ erscheint so groß wie „H1“ oder kleiner als erwartet.

Antwort: Die Theme-Typografie in Studio (Look & Feel → Typografie) ist noch
nicht auf die MAN-Skala eingestellt. Das richtet die Studio-Administration ein.

**Frage:** Nach dem Duplizieren hat die Kopie ihre Stufe verloren.

Antwort: Das ist bekannt: Die Kopie bekommt eine neue Kennung ohne Stufe.
Setzen Sie die Stufe an der Kopie neu.

**Frage:** Nach einem Wechsel von Absatz zu H2 ist die Überschrift normal groß, obwohl vorher „Body L“ gesetzt war.

Antwort: Gewollt: Body-Stufen gelten nur für Absätze. Die Erweiterung entfernt
die nicht mehr passende Stufe beim nächsten Speichern.

**Frage:** Wie schalte ich die Erweiterung zur Fehlersuche in meinem Browser ab?

Antwort: Öffnen Sie in Studio die Entwicklerkonsole des Browsers und geben Sie
`localStorage.setItem("sbt-typo-scale", "off")` ein, dann laden Sie den Tab neu.
Wieder einschalten mit `localStorage.removeItem("sbt-typo-scale")`. Das wirkt
nur in Ihrem Browser.
