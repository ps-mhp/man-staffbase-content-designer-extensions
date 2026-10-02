# FAQ

**Vraag:** In het formaat selectieveld ontbreekt de groep "MAN Typo Scale". Wat te doen? 

Antwoord: Studio laadt de extensie pas als er een aangepaste block is opgebouwd
en vergeet het als het browsertabblad opnieuw wordt geladen. 
Zet hem aan zoals beschreven in "Stap voor stap zet → extensie aan" 
. Als de groep daarna nog steeds ontbreekt, Studio
Gewijzigd — meld dit alsjeblieft aan het team dat de widgets onderhoudt. 

**Vraag:** Kan ik de uitbreiding als bouwblok op de pagina toevoegen? 

Antwoord: Nee. Het heeft geen zichtbare inhoud en verschijnt daarom niet in
in de lijst Blokken selecteren. Het werkt alleen in het veld Formaatselectie van Titel en
Tekst. 

**Vraag:** Ik zie het level in de editor, maar niet op de gepubliceerde pagina. 

Antwoord: Dan ontbreekt de aangepaste CSS met de typefoutuitbreiding in Studio of is dat wel
Verouderd. Dit is wat de studioadministratie regelt. 

**Vraag:** Er is een stap op de gepubliceerde pagina, maar niet in de editor. 

Antwoord: De extensie is nog niet actief in je browsertabblad. Wisselen
Voer het in en open de pagina opnieuw. 

**Vraag:** "Display L" lijkt zo groot als "H1" of kleiner dan verwacht. 

Antwoord: De thematypografie in Studio (look & feel → typografie) is nog steeds
niet op de MAN-schaal. Dit wordt geregeld door de studioadministratie. 

**Vraag:** Na duplicatie is de kopie zijn fase kwijtgeraakt. 

Antwoord: Dit is bekend: De kopie krijgt een nieuwe identificatie zonder niveau. 
Reset het level op de kopie. 

**Vraag:** Na het wijzigen van alinea naar H2 is de kop van normale grootte, hoewel "Body L" eerder was ingesteld. 

Antwoord: Opzettelijk: Hoofdniveaus gelden alleen voor alinea's. De uitbreiding verwijderd
Het level dat de volgende keer dat je opslaat niet meer overeenkomt. 

**Vraag:** Hoe schakel ik de debugging-extensie in mijn browser uit? 

Antwoord: Open in Studio de ontwikkelaarsconsole van de browser en typ in
'localStorage.setItem("sbt-typo-scale", "off")', en laad dan het tabblad opnieuw. 
Zet het opnieuw aan met 'localStorage.removeItem("sbt-typo-scale")'. Dit werkt
alleen in je browser.