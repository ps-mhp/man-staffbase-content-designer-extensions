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

## Wat lezers zien

De titel of alinea in de geselecteerde grootte. Om dit te laten werken, moet je dat doen
Studio twee dingen moeten worden ingesteld die de studio-admin kan regelen.
de aangepaste CSS met de Typo-extensie (Content Designer → Custom CSS)
en de thematypografie (look & feel → typografie). Als de aangepaste CSS ontbreekt, 
Lezers zien de normale grootte voor de extra levels — de inhoud zelf
blijft correct. 

## Wat je ziet in de CMS-editor

- In het formaatselectieveld van de werkbalk verschijnt de groep **"MAN Typo-Scale"**** 
  met grootte en lijnhoogte per stap, bijvoorbeeld "Body L 18/27". De vorige
  Vermeldingen zijn verborgen omdat de schaal ze volledig bevat. 
- Het selectievakje toont het actieve niveau, bijvoorbeeld "Display 2XL · 72“. 
- Blokken met een extra stap hebben een donker label in de rechterbovenhoek
  Level, bijvoorbeeld 'display-2xl' — zodat je ze in één oogopslag kunt herkennen. 

## Wanneer de uitbreiding klaar is

Studio laadt de extensie niet wanneer je een pagina opent, maar alleen wanneer je een pagina opent 
de eerste keer dat je een **Custom Block** invoegt, of
. Daarna is het op alle pagina's beschikbaar totdat je het tabblad Browser opent
Herladen. Hoe je het specifiek aanzet, vind je onder "Step by Step".