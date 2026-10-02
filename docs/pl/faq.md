# FAQ

**Pytanie:** W polu wyboru formatu brakuje grupy "MAN Literówka Skala". Co robić? 

Odpowiedź: Studio nie ładuje rozszerzenia, dopóki nie pojawi się niestandardowy blok
i zapomina o tym, gdy zakładka przeglądarki zostaje ponownie załadowana. 
Włącz go zgodnie z opisem w "Krok po kroku, włącz → rozszerzenie" 
. Jeśli grupa nadal będzie zaginęła po tym, Studio
Zmieniono — prosimy o zgłoszenie tego zespołowi zajmującemu się utrzymaniem widgetów. 

**Pytanie:** Czy mogę dodać rozszerzenie jako element budulcowy na stronie? 

Odpowiedź: Nie. Nie ma widocznej treści, dlatego nie pojawia się w
w liście Wybierz bloki. Działa tylko w polu wyboru formatu w Title oraz
SMS. 

**Pytanie:** Widzę poziom w edytorze, ale nie na opublikowanej stronie. 

Odpowiedź: Wtedy w Studio brakuje niestandardowego CSS z rozszerzeniem literówek, czy jest
przestarzałe. Tak ustawia administracja studia. 

**Pytanie:** Na stronie opublikowanej jest krok, ale nie w edytorze. 

Odpowiedź: Rozszerzenie nie jest jeszcze aktywne w karcie przeglądarki. Przełącznik
Wpisz go i otwórz stronę ponownie. 

**Pytanie:** "Display L" pojawia się tak duży jak "H1" lub mniejszy niż się spodziewano. 

Odpowiedź: Typografia tematyczna w Studio (wygląd i odczucie → typografia) nadal jest
nie ustawione na skalę MAN. To zostało ustawione przez administrację studia. 

**Pytanie:** Po zdublowaniu kopia traci swój etap. 

Odpowiedź: Wiadomo: Kopia otrzymuje nowy identyfikator bez poziomu. 
Zresetuj poziom na kopii. 

**Pytanie:** Po zmianie z akapitu na H2 nagłówek jest normalny, chociaż wcześniej ustawiono "Ciało L". 

Odpowiedź: Celowe: Poziomy ciała dotyczą tylko akapitów. Usunięto rozszerzenie
poziom, który już nie pasuje przy następnym zapisie. 

**Pytanie:** Jak wyłączyć rozszerzenie debugujące w mojej przeglądarce? 

Odpowiedź: W Studio otwórz konsolę deweloperską przeglądarki i wpisz
'localStorage.setItem("sbt-typo-scale", "off")', a następnie ponownie wczytaj zakładkę. 
Włącz go ponownie za pomocą 'localStorage.removeItem("sbt-typo-scale")'. To działa
Tylko w przeglądarce.