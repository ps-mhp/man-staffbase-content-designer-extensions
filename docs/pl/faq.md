# FAQ

**Pytanie:** W polu wyboru formatu brakuje grupy „MAN Typo-Skala”. Co zrobić?

Odpowiedź: Studio ładuje rozszerzenie dopiero wtedy, gdy użytkownik wstawia lub edytuje blok niestandardowy,
a po ponownym załadowaniu karty przeglądarki rozszerzenie to jest usuwane.
Włącz je zgodnie z opisem w sekcji „Krok po kroku → Włącz rozszerzenie”.
Jeśli grupa nadal nie jest widoczna, prawdopodobnie nastąpiły zmiany w Studio —
prosimy o zgłoszenie tego zespołu odpowiedzialnego za widżety.

**Pytanie:** Czy mogę wstawić rozszerzenie jako moduł na stronie?

Odpowiedź: Nie. Nie ma ona widocznej treści i dlatego nie pojawia się na
liście „Wybierz blok”. Działa wyłącznie w polu wyboru formatu tytułu i
tekstu oraz w oknie dialogowym „Edytuj kontener”.

**Pytanie:** W edytorze widzę poziom, którego nie widać na opublikowanej stronie.

Odpowiedź: Oznacza to, że w Studio brakuje niestandardowego arkusza CSS z rozszerzeniem Typo lub jest on
nieaktualny. Naprawi to administracja Studio.

**Pytanie:** Na opublikowanej stronie widać poziom, a w edytorze nie.

Odpowiedź: Rozszerzenie nie jest jeszcze aktywne w zakładce przeglądarki. Włącz
je i otwórz stronę ponownie.

**Pytanie:** Tytuł na opublikowanej stronie ma rozmiar tylko „H1”, mimo że chciałem ustawić poziom wyświetlania.

Odpowiedź: Tytuł nie ma jeszcze przypisanego poziomu. Tytuł bez wybranego poziomu
ma zawsze poziom H1 (32 px) — dotyczy to każdego nowego tytułu oraz tytułów ze
starszych wersji, które edytor wyświetlał jeszcze jako „Display L” lub „Display S”
. Umieść kursor w tytule, wybierz poziom w
**„Skali typograficznej MAN”** (zostanie on wtedy oznaczony ciemną etykietą) i kliknij
**Zapisz**.

**Pytanie:** Po skopiowaniu kopia utraciła swój poziom.

Odpowiedź: Jest to znane zjawisko: kopia otrzymuje nowy identyfikator bez poziomu.
Należy ponownie ustawić poziom w kopii.

**Pytanie:** Po zmianie z akapitu na H2 nagłówek ma normalną wielkość, mimo że wcześniej ustawiono „Body L”.

Odpowiedź: Tak ma być: poziomy Body dotyczą wyłącznie akapitów. Rozszerzenie usuwa
nieodpowiedni poziom przy następnym zapisaniu.

**Pytanie:** W oknie dialogowym „Edytuj kontener” brakuje sekcji „Wyrównanie pionowe”.

Odpowiedź: Rozszerzenie nie jest jeszcze aktywne w Twojej karcie przeglądarki. Włącz
je zgodnie z opisem w sekcji „Krok po kroku → Włącz rozszerzenie”
i otwórz ponownie okno dialogowe. Sekcja ta znajduje się wyłącznie w karcie
**Układ**.

**Pytanie:** Dlaczego nie widzę wyrównania na opublikowanej stronie?

Odpowiedź: Najpierw sprawdź, czy kolumny mają różną ilość treści —
jeśli są tej samej długości, nie ma czego wyrównywać. Na smartfonie
kolumny znajdują się jedna pod drugą; w tym przypadku wyrównanie celowo nie działa. Jeśli nie ma go
również na komputerze stacjonarnym, oznacza to, że niestandardowy kod CSS w Studio jest nieaktualny. Zajmuje się tym
administracja Studio.

**Pytanie:** Co oznacza opcja „jak kontener” w przypadku kolumny?

Odpowiedź: Kolumna przejmuje wyrównanie wybrane powyżej dla całego kontenera
. Jeśli wybierzesz u góry, na środku lub u dołu, dla tej kolumny obowiązuje
własne ustawienie.

**Pytanie:** Jak wyłączyć rozszerzenie do wykrywania błędów w mojej przeglądarce?

Odpowiedź: Otwórz w Studio konsolę programisty przeglądarki i wprowadź
`localStorage.setItem("sbt-typo-scale", "off")`, a następnie odśwież kartę.
Aby ponownie włączyć, wpisz `localStorage.removeItem("sbt-typo-scale")`. Działa to
tylko w Twojej przeglądarce.
