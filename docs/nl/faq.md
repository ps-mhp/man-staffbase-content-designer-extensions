# Veelgestelde vragen

**Vraag:** In het keuzemenu voor formaten ontbreekt de groep „MAN Typo-schaal“. Wat moet ik doen?

Antwoord: Studio laadt de uitbreiding pas wanneer een door de gebruiker gedefinieerd blok
wordt ingevoegd of bewerkt, en vergeet deze bij het opnieuw laden van het browsertabblad.
Schakel de extensie in zoals beschreven onder „Stap voor stap → Extensie inschakelen“.
Als de groep daarna nog steeds ontbreekt, is Studio waarschijnlijk
gewijzigd — meld dit dan alstublieft aan het team dat de widgets beheert.

**Vraag:** Kan ik de extensie als bouwsteen op de pagina invoegen?

Antwoord: Nee. De extensie heeft geen zichtbare inhoud en verschijnt daarom niet in
de lijst „Blok selecteren“. Ze werkt alleen in het formaatkeuzemenu van Titel en
Tekst en in het dialoogvenster „Container bewerken“.

**Vraag:** In de editor zie ik het niveau, maar op de gepubliceerde pagina niet.

Antwoord: Dan ontbreekt in Studio de aangepaste CSS met de Typo-uitbreiding of is deze
verouderd. Dit wordt door de Studio-beheerder ingesteld.

**Vraag:** Op de gepubliceerde pagina is een niveau te zien, in de editor niet.

Antwoord: De uitbreiding is nog niet actief in uw browsertabblad. Schakel
deze in en open de pagina opnieuw.

**Vraag:** Een titel is op de gepubliceerde pagina slechts zo groot als „H1“, hoewel ik een weergave-niveau wilde.

Antwoord: De titel heeft nog geen niveau. Een titel zonder geselecteerd niveau
staat altijd op H1 (32 px) — dit geldt voor elke nieuwe titel en voor titels uit
oudere versies, die de editor nog als „Display L“ of „Display S“
weergeeft. Plaats de cursor in de titel, selecteer het niveau onder
**„MAN Typo-schaal“** (het krijgt dan een donker label) en klik
op **Opslaan**.

**Vraag:** Na het dupliceren is het niveau van de kopie verdwenen.

Antwoord: Dit is bekend: de kopie krijgt een nieuwe identificatie zonder niveau.
Stel het niveau opnieuw in voor de kopie.

**Vraag:** Na een wisseling van alinea naar H2 is de koptekst normaal groot, hoewel eerder „Body L“ was ingesteld.

Antwoord: Dit is de bedoeling: Body-niveaus gelden alleen voor alinea’s. De extensie verwijdert
het niet langer passende niveau bij de volgende keer opslaan.

**Vraag:** In het dialoogvenster „Container bewerken“ ontbreekt het gedeelte „Verticale uitlijning“.

Antwoord: De extensie is nog niet actief in uw browsertabblad. Schakel
deze in zoals beschreven onder „Stap voor stap → Extensie inschakelen“
en open het dialoogvenster opnieuw. Het gedeelte staat alleen in het tabblad
**Lay-out**.

**Vraag:** Waarom zie ik de uitlijning niet op de gepubliceerde pagina?

Antwoord: Controleer eerst of de kolommen verschillende hoeveelheden inhoud bevatten —
als ze even lang zijn, valt er niets uit te lijnen. Op de smartphone staan
de kolommen onder elkaar; daar werkt de uitlijning bewust niet. Als deze
ook op de desktop ontbreekt, is de aangepaste CSS in Studio verouderd. Dit wordt aangepast door de
Studio-beheerder.

**Vraag:** Wat betekent „als container“ bij een kolom?

Antwoord: De kolom neemt de uitlijning over die bovenaan voor de hele container
is gekozen. Kiest u boven, midden of onder, dan geldt voor deze kolom de
eigen instelling.

**Vraag:** Hoe schakel ik de extensie voor foutopsporing in mijn browser uit?

Antwoord: Open in Studio de ontwikkelaarsconsole van de browser en voer
`localStorage.setItem("sbt-typo-scale", "off")` in en vernieuw vervolgens het tabblad.
Schakel het weer in met `localStorage.removeItem("sbt-typo-scale")`. Dit werkt
alleen in uw browser.
