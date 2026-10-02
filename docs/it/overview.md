# Estensioni per Content Designer

Questa estensione integra la casella di selezione del formato nel Content Designer di Studio
degli elementi **Titolo** e **Testo** attorno alla **MAN Errori di Battitura** con 13 livelli — 
da "Display 2XL · 72" a "Body XS · 12“. Non stai aggiungendo un blocco di costruzione
della pagina: Puoi selezionare il livello direttamente dal titolo o dal paragrafo di testo, così come
precedentemente "Heading 2" o "Paragrafo". 

| Livello | Dimensione | Elemento |
| --- | --- | --- |
| Display 2XL | 72 px | Titolo |
| Display XL | 64 px | Titolo |
| Display L | 56 px | Titolo |
| Visualizzazione M | 48 px | Titolo |
| Display S | 40 px | Titolo |
| H1 | 32 px | Titolo |
| H2 | 28 px | Testo |
| H3 | 24 px | Testo |
| H4 | 20 px | Testo |
| Corpo L | 18 px | Testo |
| Corpo M | 16 px | Testo |
| Corpo S | 14 px | Testo |
| Corpo XS | 12 px | Testo |

La struttura della pagina rimane invariata: un titolo è sempre il
Titoli principali della pagina, da H2 a H4, sono sottotitoli, livelli di corpo
sono tacchi. I livelli del display cambiano solo la dimensione. 

## Cosa vedono i lettori

Il titolo o il paragrafo nella dimensione selezionata. Perché questo funzioni, devi
Studio due devono essere configurate e che l'amministratore di Studio possa occuparsene.
il CSS personalizzato con l'estensione Typo (Content Designer → Custom CSS)
e la tipografia dei temi (look & feel → tipografia). Se manca il CSS personalizzato, 
I lettori vedono la dimensione normale per i livelli aggiuntivi — il contenuto stesso
rimane corretto. 

## Quello che vedi nell'editor CMS

- Nel campo di selezione del formato della barra degli strumenti, appare il gruppo **"MAN Typo-Scale"** 
  con dimensione e altezza per gradino, ad esempio "Corpo L 18/27". Il precedente
  Le voci sono nascoste perché la scala le contiene completamente. 
- La casella di selezione mostra il livello attivo, ad esempio "Display 2XL · 72“. 
- I blocchi con un passo aggiuntivo hanno un'etichetta scura nell'angolo in alto a destra
  livello, ad esempio 'display-2XL' — così puoi riconoscerli a colpo d'occhio. 

## Quando l'espansione sarà pronta

Studio non carica l'estensione quando apri una pagina, ma solo quando 
la prima volta che inserisci un **Blocco Personalizzato**, oppure
. Dopo di ciò, sarà disponibile su tutte le pagine finché non apri la scheda Browser
ricarica. Come accenderlo nello specifico si trova sotto "Passo dopo passo".