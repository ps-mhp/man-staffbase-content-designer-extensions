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

## Ce que voient les lecteurs

Le titre ou le paragraphe dans la taille sélectionnée. Pour que cela fonctionne, il faut
Les choses de Studio deux doivent être configurées pour que l’administrateur Studio puisse s’occuper.
le CSS personnalisé avec l’extension Typo (Content Designer → Custom CSS)
et la typographie du thème (look & feel → typographie). Si le CSS personnalisé manque, 
Les lecteurs voient la taille normale des niveaux supplémentaires — le contenu lui-même
Reste correct. 

## Ce que vous voyez dans l’éditeur CMS

- Dans le champ de sélection de format de la barre d’outils, le groupe **« MAN Typo-Scale »** apparaît 
  avec la taille et la hauteur de la ligne par marche, par exemple « Corps L 18/27 ». Le précédent
  Les entrées sont masquées car l’échelle les contient complètement. 
- La boîte de sélection affiche le niveau actif, par exemple « Afficher 2XL · 72“. 
- Les blocs avec un pas supplémentaire ont une étiquette sombre dans le coin supérieur droit
  Niveau, par exemple « display-2xl » — pour que vous puissiez les reconnaître d’un coup d’œil. 

## Quand l’extension sera prête

Studio ne charge pas l’extension quand vous ouvrez une page, mais seulement lorsque vous 
la première fois que vous insérez un **Bloc personnalisé**, ou
. Après cela, il sera disponible sur toutes les pages jusqu’à ce que vous ouvriez l’onglet Navigateur
Recharge. Comment l’activer spécifiquement se trouve sous « Étape par étape ».