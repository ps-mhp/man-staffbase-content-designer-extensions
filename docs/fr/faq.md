# FAQ

**Question :** Dans le champ de sélection du format, le groupe « MAN Typo Scale » manque. Que faire ? 

Réponse : Studio ne charge l’extension qu’après un bloc personnalisé
et il l’oublie quand l’onglet du navigateur est rechargé. 
Allumez-la comme décrit dans « Activation étape par étape → extension » 
. Si le groupe est toujours absent après cela, Studio
Modifié — Veuillez signaler cela à l’équipe qui gère les widgets. 

**Question :** Puis-je ajouter l’extension comme élément de base sur la page ? 

Réponse : Non. Il n’a pas de contenu visible et n’apparaît donc pas dans
dans la liste Sélection de blocs. Cela ne fonctionne que dans le champ de sélection de format de Titre et
Texto. 

**Question :** Je vois le niveau dans l’éditeur, mais pas sur la page publiée. 

Réponse : Alors le CSS personnalisé avec l’extension faute de frappe manque dans Studio ou bien est
Déprécié. C’est ce que l’administration du studio met en place. 

**Question :** Il y a une étape sur la page publiée, mais pas dans l’éditeur. 

Réponse : L’extension n’est pas encore active dans l’onglet de votre navigateur. Basculer
Entrez-le et ouvrez la page à nouveau. 

**Question :** « Affichage L » apparaît aussi grand que « H1 » ou plus petit que prévu. 

Réponse : La typographie thématique dans Studio (look & feel → typographie) est toujours présente
pas réglé à l’échelle MAN. C’est organisé par l’administration du studio. 

**Question :** Après duplication, la copie a perdu son niveau. 

Réponse : Ceci est connu : la copie obtient un nouvel identifiant sans niveau. 
Réinitialisez le niveau sur la copie. 

**Question :** Après avoir changé de paragraphe à H2, l’en-tête est de taille normale, bien que « Corps L » ait été défini auparavant. 

Réponse : Intentionnel : Les niveaux corporels ne s’appliquent qu’aux paragraphes. Suppression de l’extension
Le niveau qui ne correspond plus à la prochaine sauvegarde. 

**Question :** Comment désactiver l’extension de débogage dans mon navigateur ? 

Réponse : Dans Studio, ouvrez la console développeur du navigateur et tapez
'localStorage.setItem(« sbt-typo-scale », « off »)', puis recharger l’onglet. 
Rallumez-le avec 'localStorage.removeItem(« sbt-typo-scale »)'. Ça fonctionne
Uniquement dans votre navigateur.