# Rozszerzenia Content Designera

To rozszerzenie uzupełnia w Content Designerze programu Studio pole wyboru formatu
elementów **Tytuł** i **Tekst** o **skalę typograficzną MAN** z 13 poziomami —
od „Display 2XL · 72” do „Body XS · 12”. Nie wstawia to żadnego modułu
na stronę: poziom wybiera się bezpośrednio przy tytule lub akapicie tekstu, tak jak
dotychczas „Nagłówek 2” lub „Akapit”.

| Poziom | Rozmiar | Element |
| --- | --- | --- |
| Display 2XL | 72 px | Tytuł |
| Display XL | 64 px | Tytuł |
| Display L | 56 px | Tytuł |
| Display M | 48 px | Tytuł |
| Display S | 40 px | Tytuł |
| H1 | 32 px | Tytuł |
| H2 | 28 px | Tekst |
| H3 | 24 px | Tekst |
| H4 | 20 px | Tekst |
| Body L | 18 px | Tekst |
| Body M | 16 px | Tekst |
| Body S | 14 px | Tekst |
| Body XS | 12 px | Tekst |

Struktura strony pozostaje przy tym niezmieniona: tytuł jest zawsze
głównym nagłówkiem strony, H2 do H4 to podtytuły, a poziomy Body
to akapity. Poziomy wyświetlania zmieniają jedynie rozmiar.

## Wyrównanie pionowe w kolumnach kontenera

Jeśli w **kontenerze** obok siebie znajdują się kolumny o różnej długości,
dotychczas treść każdej kolumny zaczynała się u góry. Dzięki temu rozszerzeniu można określić,
czy ma się on znajdować **u góry**, **w środku** czy **u dołu** — dla całego kontenera
oraz, w razie potrzeby, osobno dla poszczególnych kolumn. Ustawienie to znajduje się w
oknie dialogowym **Edytuj kontener** w zakładce **Układ**.

Na smartfonach kolumny są ułożone jedna pod drugą i mają wysokość równą tylko wysokości ich
zawartości. W tym przypadku wyrównanie nie jest konieczne i nie jest widoczne.

## Co widzą czytelnicy

Tytuł lub akapit w wybranym rozmiarze oraz zawartość kolumn w
wybranym wyrównaniu. Aby to działało, w Studio muszą być skonfigurowane dwie rzeczy,
o które dba administracja Studio:
niestandardowy CSS z rozszerzeniem Typo (Content Designer → Niestandardowy CSS)
oraz typografia motywu (Look & Feel → Typografia). Jeśli brakuje niestandardowego CSS,
czytelnicy widzą w dodatkowych poziomach normalny rozmiar, a zawartość kolumn
znajduje się u góry — sama treść pozostaje poprawna.

## Co widzisz w edytorze CMS

- W polu wyboru formatu na pasku narzędzi pojawia się grupa **„Skala MAN Typo”**
  z rozmiarem i wysokością wiersza dla każdego poziomu, np. „Body L 18/27”. Dotychczasowe
  wpisy są w tym celu ukrywane, ponieważ skala obejmuje je w całości.
- Pole wyboru wskazuje aktywny poziom, np. „Display 2XL · 72”.
- Bloki z dodatkowym poziomem mają w prawym górnym rogu ciemną etykietę z
  wskazaniem poziomu, np. `display-2xl` — dzięki temu można je rozpoznać na pierwszy rzut oka.
- W oknie dialogowym **Edytuj kontener → Układ**, pod
  przyciskami układu znajduje się sekcja **„Wyrównanie pionowe”**. Kolumny
  w edytorze natychmiast pokazują wybrane wyrównanie.

## Kiedy rozszerzenie jest dostępne

Studio nie ładuje rozszerzenia już przy otwarciu strony, ale dopiero wtedy,
gdy po raz pierwszy wstawisz lub
edytujesz **blok niestandardowy**. Następnie jest ono dostępne na wszystkich stronach, dopóki nie odświeżysz
karty przeglądarki. Jak je włączyć, dowiesz się w sekcji „Krok po kroku”.
