# Extensions du Content Designer

Cette extension ajoute, dans le Content Designer de Studio, au menu de sélection de format
des éléments **Titre** et **Texte** la **échelle typographique MAN** comportant 13 niveaux —
de « Display 2XL · 72 » à « Body XS · 12 ». Vous n’insérez ainsi aucun bloc
sur la page : vous sélectionnez le niveau directement au niveau du titre ou du paragraphe, comme
auparavant avec « Titre 2 » ou « Paragraphe ».

| Niveau | Taille | Élément |
| --- | --- | --- |
| Display 2XL | 72 px | Titre |
| Display XL | 64 px | Titre |
| Display L | 56 px | Titre |
| Display M | 48 px | Titre |
| Display S | 40 px | Titre |
| H1 | 32 px | Titre |
| H2 | 28 px | Texte |
| H3 | 24 px | Texte |
| H4 | 20 px | Texte |
| Corps L | 18 px | Texte |
| Corps M | 16 px | Texte |
| Corps S | 14 px | Texte |
| Corps XS | 12 px | Texte |

La structure de la page reste inchangée : un titre est toujours le
titre principal de la page, les niveaux H2 à H4 sont des sous-titres, et les niveaux Body
correspondent à des paragraphes. Les niveaux d'affichage ne modifient que la taille.

## Alignement vertical dans les colonnes d’un conteneur

Lorsque des colonnes de longueurs différentes sont disposées côte à côte dans un **conteneur**,
le contenu de chaque colonne commence jusqu’à présent en haut. Grâce à cette extension, vous pouvez définir
s'il se trouve **en haut**, au **milieu** ou **en bas** — pour l'ensemble du conteneur
et, si nécessaire, de manière différente pour chaque colonne. Vous trouverez ce paramètre dans la
boîte de dialogue **Modifier le conteneur**, dans l’onglet **Mise en page**.

Sur les smartphones, les colonnes s’affichent les unes en dessous des autres et leur hauteur correspond uniquement à celle de leur
contenu. Dans ce cas, aucun alignement n’est nécessaire et aucun n’est visible.

## Ce que voient les lectrices et lecteurs

Le titre ou le paragraphe dans la taille choisie et le contenu des colonnes dans l’
alignement sélectionné. Pour que cela fonctionne, deux éléments doivent être
configurés dans Studio, dont s’occupe l’administration de Studio
: le CSS personnalisé avec l’extension Typo (Content Designer → CSS personnalisé)
et la typographie du thème (Look & Feel → Typographie). Si le CSS personnalisé fait défaut,
les lectrices et lecteurs verront, pour les niveaux supplémentaires, la taille normale et le contenu des colonnes
en haut — le contenu lui-même reste correct.

## Ce que vous voyez dans l’éditeur CMS

- Dans le menu déroulant de format de la barre d’outils, le groupe **« Échelle typographique MAN »**
  apparaît avec la taille et la hauteur de ligne pour chaque niveau, par exemple « Body L 18/27 ». Les entrées précédentes
  sont masquées, car l’échelle les inclut intégralement.
- Le menu de sélection indique le niveau actif, par exemple « Display 2XL · 72 ».
- Les blocs comportant un niveau supplémentaire portent en haut à droite une étiquette sombre indiquant
  leur niveau, par exemple `display-2xl` — vous pouvez ainsi les reconnaître d’un seul coup d’œil.
- Dans la boîte de dialogue **Modifier le conteneur → Mise en page**, sous les
  boutons de mise en page, se trouve la section **« Alignement vertical »**. Les colonnes
  de l’éditeur affichent immédiatement l’alignement sélectionné.

## Quand l’extension est-elle disponible ?

Studio ne charge pas l’extension dès l’ouverture d’une page, mais seulement
lorsque vous insérez ou
modifiez pour la première fois un **bloc personnalisé**. Elle est ensuite disponible sur toutes les pages jusqu’à ce que vous actualisiez l’onglet
du navigateur. Pour savoir comment l’activer de manière ciblée, consultez la section « Étape par étape ».
