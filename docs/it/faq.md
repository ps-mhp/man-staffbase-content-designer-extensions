# FAQ

**Domanda:** Nel campo di selezione del formato manca il gruppo “MAN Typo-Skala”. Cosa fare?

Risposta: Studio carica l’estensione solo quando viene inserito o modificato un blocco personalizzato
e la disattiva al riavvio della scheda del browser.
Attivatela come descritto nella sezione «Passo dopo passo → Attivare l’estensione».
Se il gruppo continua a mancare, è probabile che Studio
sia stato modificato — segnalatelo al team che gestisce i widget.

**Domanda:** Posso inserire l’estensione come modulo nella pagina?

Risposta: No. Non ha contenuti visibili e pertanto non compare nell’
elenco «Seleziona blocco». È attiva solo nel campo di selezione del formato di titolo e
testo e nella finestra di dialogo «Modifica contenitore».

**Domanda:** Nell’editor vedo il gradino, ma non nella pagina pubblicata.

Risposta: In tal caso, in Studio manca il CSS personalizzato con l’estensione tipografica oppure è
obsoleto. Se ne occuperà l’amministrazione di Studio.

**Domanda:** Sulla pagina pubblicata si vede un livello, nell’editor no.

Risposta: L’estensione non è ancora attiva nella scheda del browser. Attivala
e riapri la pagina.

**Domanda:** Un titolo sulla pagina pubblicata ha le stesse dimensioni di un “H1”, anche se volevo un livello di visualizzazione.

Risposta: Il titolo non ha ancora un livello assegnato. Un titolo senza livello selezionato
è sempre impostato su H1 (32 px) — questo vale per ogni nuovo titolo e per i titoli delle
versioni precedenti, che l’editor visualizzava ancora come “Display L” o “Display S”
. Posizionate il cursore nel titolo, selezionate il livello sotto
**«Scala tipografica MAN»** (verrà contrassegnato con un’etichetta scura) e cliccate
su **Salva**.

**Domanda:** Dopo la duplicazione, la copia ha perso il proprio livello.

Risposta: È un fenomeno noto: alla copia viene assegnato un nuovo identificativo senza livello.
Impostare nuovamente il livello sulla copia.

**Domanda:** Dopo essere passati da un paragrafo a un H2, il titolo ha dimensioni normali, sebbene in precedenza fosse impostato «Body L».

Risposta: È intenzionale: i livelli «Body» si applicano solo ai paragrafi. L’estensione rimuove
il livello non più appropriato al prossimo salvataggio.

**Domanda:** Nella finestra di dialogo «Modifica contenitore» manca la sezione «Allineamento verticale».

Risposta: L’estensione non è ancora attiva nella scheda del browser. Attivatela
come descritto in «Passo dopo passo → Attivare l’estensione»
e riaprite la finestra di dialogo. La sezione è disponibile solo nella scheda
**Layout**.

**Domanda:** Perché non vedo l’allineamento nella pagina pubblicata?

Risposta: Verifichi innanzitutto se le colonne contengono quantità diverse di contenuto —
se hanno la stessa lunghezza, non c’è nulla da allineare. Sullo smartphone
le colonne sono disposte una sotto l’altra; in quel caso l’allineamento non ha effetto, come previsto. Se manca
anche sul desktop, il CSS personalizzato in Studio non è aggiornato. Se ne occupa l’
amministrazione di Studio.

**Domanda:** Cosa significa «come contenitore» per una colonna?

Risposta: La colonna adotta l’allineamento selezionato in alto per l’intero contenitore
. Se si seleziona «in alto», «al centro» o «in basso», a quella colonna si applica la
propria impostazione.

**Domanda:** Come si disattiva l’estensione per la ricerca degli errori nel browser?

Risposta: Aprire la console di sviluppo del browser in Studio e inserire
`localStorage.setItem("sbt-typo-scale", "off")`, quindi ricaricate la scheda.
Per riattivarla, utilizzate `localStorage.removeItem("sbt-typo-scale")`. Questa operazione ha effetto
solo nel vostro browser.
