# Estensioni per il Content Designer

Questa estensione aggiunge nel Content Designer di Studio, nel campo di selezione del formato
degli elementi **Titolo** e **Testo**, la **scala tipografica MAN** con 13 livelli —
da "Display 2XL · 72" a "Body XS · 12". In questo modo non si inserisce alcun modulo
nella pagina: il livello va selezionato direttamente sul titolo o sul paragrafo, proprio come
finora con "Titolo 2" o "Paragrafo".

| Livello | Dimensione | Elemento |
| --- | --- | --- |
| Display 2XL | 72 px | Titolo |
| Display XL | 64 px | Titolo |
| Display L | 56 px | Titolo |
| Display M | 48 px | Titolo |
| Display S | 40 px | Titolo |
| H1 | 32 px | Titolo |
| H2 | 28 px | Testo |
| H3 | 24 px | Testo |
| H4 | 20 px | Testo |
| Body L | 18 px | Testo |
| Body M | 16 px | Testo |
| Body S | 14 px | Testo |
| Body XS | 12 px | Testo |

La struttura della pagina rimane invariata: un titolo è sempre il
titolo principale della pagina, H2 fino a H4 sono sottotitoli, i livelli Body
sono paragrafi. I livelli di visualizzazione modificano solo la dimensione.

## Allineamento verticale nelle colonne di un contenitore

Se in un **contenitore** sono presenti colonne di lunghezza diversa affiancate,
finora il contenuto di ogni colonna iniziava in alto. Con questa estensione è possibile specificare
se il contenuto si trovi **in alto**, al **centro** o **in basso** — per l’intero contenitore
e, se necessario, in modo diverso per le singole colonne. L’impostazione si trova nella
finestra di dialogo **Modifica contenitore** nella scheda **Layout**.

Sugli smartphone le colonne sono disposte una sotto l’altra e hanno un’altezza pari solo al loro
contenuto. In questo caso non è necessario alcun allineamento e non ne è visibile alcuno.

## Cosa vedono i lettori

Il titolo o il paragrafo nella dimensione selezionata e i contenuti delle colonne nell’
allineamento scelto. Affinché ciò funzioni, in Studio devono essere configurate due cose
di cui si occupa l’amministrazione di Studio
: il CSS personalizzato con l’estensione tipografica (Content Designer → CSS personalizzato)
e la tipografia del tema (Look & Feel → Tipografia). Se manca il CSS personalizzato,
nei livelli aggiuntivi i lettori vedranno la dimensione normale e i contenuti delle colonne
in alto — il contenuto stesso rimane corretto.

## Cosa vedete nell’editor CMS

- Nel campo di selezione del formato della barra degli strumenti compare il gruppo **«Scala tipografica MAN»**
  con dimensione e altezza della riga per ogni livello, ad es. «Body L 18/27». Le voci precedenti
  vengono nascoste, poiché la scala le contiene integralmente.
- Il menu di selezione mostra il livello attivo, ad es. «Display 2XL · 72».
- I blocchi con un livello aggiuntivo riportano in alto a destra un’etichetta scura con
  il proprio livello, ad es. `display-2xl` — in questo modo è possibile riconoscerli a colpo d’occhio.
- Nella finestra di dialogo **Modifica contenitore → Layout**, sotto i
  pulsanti di layout, si trova la sezione **«Allineamento verticale»**. Le colonne
  nell’editor mostrano immediatamente l’allineamento selezionato.

## Quando l’estensione è disponibile

Studio non carica l’estensione all’apertura di una pagina, ma solo
quando si inserisce o si
modifica per la prima volta un **blocco personalizzato**. Successivamente sarà disponibile su tutte le pagine, finché non si
aggiorna la scheda del browser. Per sapere come attivarla in modo mirato, consultare la sezione «Passo dopo passo».
