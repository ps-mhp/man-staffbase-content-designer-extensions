# Extensions de Content Designer

Cette extension complète la boîte de sélection de format dans Content Designer de Studio
des éléments **Titre** et **Text** autour de l'**HOMME Échelle de Fautes de Frappe** avec 13 niveaux — 
de « Display 2XL · 72 » à « Body XS · 12“. Vous n’ajoutez pas de base
de la page : Vous pouvez sélectionner le niveau directement depuis le titre ou le paragraphe texte, ainsi que
auparavant « Titre 2 » ou « Paragraphe ». 

| Niveau | Taille | Élément |
| --- | --- | --- |
| Affichage 2XL | 72 px | Titre |
| Affichage XL | 64 px | Titre |
| Affichage L | 56 px | Titre |
| Affichage M | 48 px | Titre |
| Affichage S | 40 px | Titre |
| H1 | 32 px | Titre |
| H2 | 28 px | Texte |
| H3 | 24 px | Texte |
| H4 | 20 px | Texte |
| Corps L | 18 px | Texte |
| Corps M | 16 px | Texte |
| Corps S | 14 px | Texte |
| Corps XS | 12 px | Texte |

La structure de la page reste inchangée : un titre est toujours le
Titre principal de la page, H2 à H4, sont les sous-titres, niveaux de corps
sont des talons. Les niveaux d’affichage ne changent que la taille. 

## Alignement vertical dans les colonnes de conteneurs

S’il y a des colonnes de longueurs différentes côte à côte dans un **conteneur**, 
Le contenu de chaque colonne commence en haut. Avec l’extension, vous spécifiez 
qu’il soit **au-dessus**, au **milieu** ou **en dessous** — pour tout le contenant
et, si nécessaire, différemment selon les colonnes individuelles. Le réglage se trouve dans le
Dialogue **Modifier le conteneur** dans l’onglet **Mise en page**. 

Sur les smartphones, les colonnes sont les unes en dessous des autres et ne sont plus hautes que vous
Contenu. Aucun alignement n’est nécessaire à cet endroit et aucun ne peut être visible. 

## Ce que voient les lecteurs

Le titre ou paragraphe dans la taille sélectionnée et le contenu de la colonne dans le
orientation choisie. Pour que cela fonctionne, deux choses doivent être faites en Studio.
mise en place autour de laquelle l’administration du studio
le CSS personnalisé avec l’extension Typo (Content Designer → Custom CSS)
et la typographie du thème (look & feel → typographie). Si le CSS personnalisé manque, 
Les lecteurs voient la taille normale et le contenu des colonnes pour les niveaux supplémentaires
Top — Le contenu lui-même reste correct. 

## Ce que vous voyez dans l’éditeur CMS

- Dans le champ de sélection de format de la barre d’outils, le groupe **« MAN Typo-Scale »** apparaît 
  avec la taille et la hauteur de la ligne par marche, par exemple « Corps L 18/27 ». Le précédent
  Les entrées sont masquées car l’échelle les contient complètement. 
- La boîte de sélection affiche le niveau actif, par exemple « Afficher 2XL · 72“. 
- Les blocs avec un pas supplémentaire ont une étiquette sombre dans le coin supérieur droit
  Niveau, par exemple « display-2xl » — pour que vous puissiez les reconnaître d’un coup d’œil. 
- Dans le dialogue **Modifier le conteneur, → la disposition** est listée sous le
  Boutons de disposition de la section « Alignement vertical ». Les colonnes
  Dans l’éditeur, affichez immédiatement l’orientation sélectionnée. 

## Quand l’extension sera prête

Studio ne charge pas l’extension quand vous ouvrez une page, mais seulement lorsque vous 
la première fois que vous insérez un **Bloc personnalisé**, ou
. Après cela, il sera disponible sur toutes les pages jusqu’à ce que vous ouvriez l’onglet Navigateur
Recharge. Comment l’activer spécifiquement se trouve sous « Étape par étape ».