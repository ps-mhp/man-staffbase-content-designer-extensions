# Uitbreidingen voor de Content Designer

Deze uitbreiding voegt in de Content Designer van Studio aan het keuzemenu voor opmaak
van de elementen **Titel** en **Tekst** de **MAN-Typo-schaal** met 13 niveaus toe —
van „Display 2XL · 72“ tot „Body XS · 12“. U voegt hiermee geen bouwsteen toe
aan de pagina: u selecteert het niveau direct bij de titel of de tekstalinea, net zoals
voorheen bij „Kop 2“ of „Alinea“.

| Niveau | Grootte | Element |
| --- | --- | --- |
| Display 2XL | 72 px | Titel |
| Display XL | 64 px | Titel |
| Display L | 56 px | Titel |
| Display M | 48 px | Titel |
| Display S | 40 px | Titel |
| H1 | 32 px | Titel |
| H2 | 28 px | Tekst |
| H3 | 24 px | Tekst |
| H4 | 20 px | Tekst |
| Body L | 18 px | Tekst |
| Body M | 16 px | Tekst |
| Body S | 14 px | Tekst |
| Body XS | 12 px | Tekst |

De indeling van de pagina blijft daarbij ongewijzigd: een titel is altijd de
hoofdkop van de pagina, H2 tot en met H4 zijn tussenkoppen, Body-niveaus
zijn alinea's. De weergaveniveaus veranderen alleen de grootte.

## Verticale uitlijning in container-kolommen

Als er in een **container** kolommen van verschillende lengte naast elkaar staan,
begint de inhoud van elke kolom tot nu toe bovenaan. Met deze uitbreiding kunt u instellen
of de inhoud **boven**, in het **midden** of **onder** staat — voor de hele container
en, indien nodig, afwijkend voor afzonderlijke kolommen. U vindt deze instelling in het
dialoogvenster **Container bewerken** op het tabblad **Lay-out**.

Op smartphones staan de kolommen onder elkaar en zijn ze slechts zo hoog als hun
inhoud. Daar is geen uitlijning nodig en is er ook geen te zien.

## Wat lezers zien

De titel of alinea in de gekozen grootte en de kolominhoud in de
gekozen uitlijning. Om dit te laten werken, moeten in Studio twee zaken
worden ingesteld, waar de Studio-beheerder
voor zorgt: de aangepaste CSS met de Typo-uitbreiding (Content Designer → Aangepaste CSS)
en de thematypografie (Look & Feel → Typografie). Als de aangepaste CSS ontbreekt,
zien lezers bij de extra niveaus de normale grootte en de kolominhoud
bovenaan — de inhoud zelf blijft correct.

## Wat u in de CMS-editor ziet

- In het formaatkeuzemenu van de werkbalk verschijnt de groep **„MAN Typo-schaal“**
  met lettergrootte en regelhoogte per niveau, bijv. „Body L 18/27“. De eerdere
  vermeldingen worden hiervoor verborgen, omdat de schaal deze volledig omvat.
- Het keuzemenu toont het actieve niveau, bijv. „Display 2XL · 72“.
- Blokken met een extra niveau hebben rechtsboven een donker label met
  hun niveau, bijv. `display-2xl` — zo herkent u ze in één oogopslag.
- In het dialoogvenster **Container bewerken → Lay-out** staat onder de
  lay-outknoppen het gedeelte **„Verticale uitlijning“**. De kolommen
  in de editor geven de gekozen uitlijning onmiddellijk weer.

## Wanneer de uitbreiding beschikbaar is

Studio laadt de uitbreiding niet meteen bij het openen van een pagina, maar pas
wanneer u voor het eerst een **aangepast blok** invoegt of
bewerkt. Daarna is de extensie op alle pagina’s beschikbaar, totdat u het browsertabblad
opnieuw laadt. Hoe u de extensie gericht kunt inschakelen, leest u onder „Stap voor stap“.
