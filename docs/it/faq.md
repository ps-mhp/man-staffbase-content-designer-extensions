# FAQ

**Domanda:** Nel campo di selezione del formato, manca il gruppo "MAN Typo Scale". Cosa fare? 

Risposta: Studio non carica l'estensione finché non si tratta di un blocco personalizzato
e se ne dimentica quando la scheda del browser viene ricaricata. 
Accendilo come descritto in "Accensione passo dopo passo → estensione" 
. Se il gruppo manca ancora dopo, Studio
Cambiato — Per favore, segnala questo al team che mantiene i widget. 

**Domanda:** Posso aggiungere l'estensione come elemento di base sulla pagina? 

Risposta: No. Non ha contenuto visibile e quindi non appare in
nella lista Seleziona blocchi. Funziona solo nel campo selezione Formato di Titolo e
Messaggio. 

**Domanda:** Vedo il livello nell'editor, ma non nella pagina pubblicata. 

Risposta: Allora il CSS personalizzato con l'estensione per errori di battitura manca in Studio o è
Deprecato. Questo è ciò che organizza l'amministrazione dello studio. 

**Domanda:** C'è un passaggio nella pagina pubblicata, ma non nell'editor. 

Risposta: L'estensione non è ancora attiva nella scheda del browser. Toggle
Inseriscilo e apri di nuovo la pagina. 

**Domanda:** "Display L" appare grande quanto "H1" o più piccolo del previsto. 

Risposta: La tipografia tematica in Studio (look & feel → tipografia) è ancora presente
non impostato alla scala MAN. Questo è impostato dall'amministrazione dello studio. 

**Domanda:** Dopo aver duplicato, la copia ha perso il suo stadio. 

Risposta: Questo è noto: la copia riceve un nuovo identificatore senza livello. 
Resetta il livello sulla copia. 

**Domanda:** Dopo il passaggio dal paragrafo a H2, l'intestazione è di dimensione normale, anche se in precedenza era impostato "Corpo L". 

Risposta: Intenzionale: I livelli corporei si applicano solo ai paragrafi. Rimossa l'estensione
Il livello che non corrisponde più alla prossima volta che salvi. 

**Domanda:** Come posso disattivare l'estensione di debug nel mio browser? 

Risposta: In Studio, apri la console sviluppatore del browser e digita
'localStorage.setItem("sbt-typo-scale", "off")', poi ricarica la scheda. 
Riattivalo con 'localStorage.removeItem("sbt-typo-scale")'. Funziona
Solo nel tuo browser.