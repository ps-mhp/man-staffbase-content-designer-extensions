# Rozszerzenia Content Designera

To rozszerzenie uzupełnia pole wyboru formatu w Content Designerze Studio
elementów **Tytuł** i **Tekst** wokół **MAN Miernej Skali Literówek** z 13 poziomami — 
od "Display 2XL · 72" do "Body XS · 12“. Nie dodajesz żadnego elementu
strony: Możesz wybrać poziom bezpośrednio z tytułu lub akapitu tekstowego, a także
wcześniej "Nagłówek 2" lub "Akapit". 

| Poziom | Rozmiar | Element |
| --- | --- | --- |
| Wyświetlacz 2XL | 72 px | Tytuł |
| Wyświetlacz XL | 64 px | Tytuł |
| Wyświetlacz L | 56 px | Tytuł |
| Wyświetlacz M | 48 px | Tytuł |
| Wyświetlacz S | 40 px | Tytuł |
| H1 | 32 px | Tytuł |
| H2 | 28 px | Tekst |
| H3 | 24 px | Tekst |
| H4 | 20 px | Tekst |
| Ciało L | 18 px | Tekst |
| Ciało M | 16 px | Tekst |
| Ciało S | 14 px | Tekst |
| Ciało XS | 12 px | Tekst |

Struktura strony pozostaje niezmieniona: tytuł zawsze jest
Główny nagłówek strony, od H2 do H4, to podtytuły, poziomy ciała
to obcasy. Poziomy wyświetlacza zmieniają tylko rozmiar. 

## Co widzą czytelnicy

Tytuł lub akapit w wybranym rozmiarze. Aby to zadziałało, musisz
Studio Two musi być skonfigurowane i administratorzy Studia będą mogli się nimi zająć.
Custom CSS z rozszerzeniem Typo (Content Designer → Custom CSS)
oraz typografię tematyczną (wygląd i odczucie → typografii). Jeśli brakuje niestandardowego CSS, 
Czytelnicy widzą normalny rozmiar dodatkowych poziomów — samą treść
pozostaje poprawne. 

## Co widzisz w edytorze CMS

- W polu wyboru formatu na pasku paska znajduje się grupa **"MAN Typo-Scale"** 
  z rozmiarem i wysokością linii na każdy stopień, np. "Body L 18/27". Poprzednie
  Wpisy są ukryte, ponieważ skala zawiera je całkowicie. 
- Pole wyboru pokazuje aktywny poziom, np. "Display 2XL · 72“. 
- Bloki z dodatkowym krokiem mają ciemną etykietę w prawym górnym rogu
  np. 'display-2XL' — więc rozpoznać je od razu. 

## Gdy rozbudowa będzie gotowa

Studio nie ładuje rozszerzenia, gdy otwierasz stronę, tylko gdy 
za pierwszym razem, gdy wstawiasz **Niestandardowy Blok**, lub
. Po tym będzie dostępna na wszystkich stronach, dopóki nie otworzysz zakładki Przeglądarka
Właduj ponownie. Jak dokładnie go włączyć, można znaleźć w sekcji "Krok po kroku".