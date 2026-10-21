# Content Designer Uitbreidingen

Deze extensie vult het formaat selectievak in de Content Designer van Studio aan
van de elementen **Titel** en **Tekst** rond de **MAN Typo Schaal** met 13 niveaus — 
van "Display 2XL · 72" tot "Body XS · 12“. Je voegt geen bouwsteen toe
van de pagina: Je kunt het niveau direct selecteren vanuit de titel of de tekstparagraaf, evenals
voorheen "Kop 2" of "Paragraaf". 

| Niveau | Grootte | Element |
| --- | --- | --- |
| Display 2XL | 72 px | Titel |
| Display XL | 64 px | Titel |
| Display L | 56 px | Titel |
| Weergave M | 48 px | Titel |
| Display S | 40 px | Titel |
| H1 | 32 px | Titel |
| H2 | 28 px | Tekst |
| H3 | 24 px | Tekst |
| H4 | 20 px | Tekst |
| Lichaam L | 18 px | Tekst |
| Body M | 16 px | Tekst |
| Body S | 14 px | Tekst |
| Body XS | 12 px | Tekst |

De structuur van de pagina blijft ongewijzigd: een titel is altijd de
De hoofdkop van de pagina, H2 tot H4, zijn subkoppen, lichaamsniveaus,
zijn hakken. De displayniveaus veranderen alleen de grootte. 

## Verticale uitlijning in containerkolommen

Als er kolommen van verschillende lengtes naast elkaar staan in een **container**, 
De inhoud van elke kolom begint bovenaan. Met de extensie specificeer je 
of het nu **boven** is, in het **midden** of **onder** — voor de hele container
en, indien nodig, anders voor individuele kolommen. De setting is te vinden in de
Dialoog **Container bewerken** in het **Layout**-tabblad. 

Op smartphones liggen de kolommen onder elkaar en zijn ze slechts zo hoog als jij
Inhoud. Daar is geen uitstemming nodig en er is geen te zien. 

## Wat lezers zien

De titel of alinea in de geselecteerde grootte en de kolominhoud in de
gekozen oriëntatie. Om dit te laten werken, moeten er twee dingen in Studio gebeuren.
rondom welke de studioadministratie werd opgezet
de aangepaste CSS met de Typo-extensie (Content Designer → Custom CSS)
en de thematypografie (look & feel → typografie). Als de aangepaste CSS ontbreekt, 
Lezers zien de normale grootte en kolominhoud voor de extra niveaus
TOP — de inhoud zelf blijft correct. 

## Wat je ziet in de CMS-editor

- In het formaatselectieveld van de werkbalk verschijnt de groep **"MAN Typo-Scale"**** 
  met grootte en lijnhoogte per stap, bijvoorbeeld "Body L 18/27". De vorige
  Vermeldingen zijn verborgen omdat de schaal ze volledig bevat. 
- Het selectievakje toont het actieve niveau, bijvoorbeeld "Display 2XL · 72“. 
- Blokken met een extra stap hebben een donker label in de rechterbovenhoek
  Level, bijvoorbeeld 'display-2xl' — zodat je ze in één oogopslag kunt herkennen. 
- In het dialoogvenster **Container bewerken → lay-out** wordt vermeld onder de
  Layoutknoppen van de sectie "Verticale uitlijning". De kolommen
  toon in de editor direct de geselecteerde oriëntatie. 

## Wanneer de uitbreiding klaar is

Studio laadt de extensie niet wanneer je een pagina opent, maar alleen wanneer je een pagina opent 
de eerste keer dat je een **Custom Block** invoegt, of
. Daarna is het op alle pagina's beschikbaar totdat je het tabblad Browser opent
Herladen. Hoe je het specifiek aanzet, vind je onder "Step by Step".