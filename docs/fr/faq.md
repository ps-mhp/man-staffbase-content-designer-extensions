# FAQ

**Question :** Le groupe « MAN Typo-Skala » n'apparaît pas dans le menu déroulant des formats. Que faire ?

Réponse : Studio ne charge l'extension que lorsqu'un bloc personnalisé
est inséré ou modifié, et l'oublie lors du rafraîchissement de l'onglet du navigateur.
Activez-la comme décrit dans la section « Étape par étape → Activer l’extension ».
Si le groupe est toujours absent après cela, c’est probablement que Studio
a changé — veuillez le signaler à l’équipe en charge des widgets.

**Question :** Puis-je insérer l’extension en tant que module sur la page ?

Réponse : Non. Elle n’a pas de contenu visible et n’apparaît donc pas dans
la liste « Sélectionner un bloc ». Elle n’agit que dans le champ de sélection de format du titre et
du texte et dans la boîte de dialogue « Modifier le conteneur ».

**Question :** Dans l’éditeur, je vois le niveau, mais pas sur la page publiée.

Réponse : Cela signifie que le CSS personnalisé avec l’extension typographique est absent de Studio ou qu’il est
obsolète. L’administration de Studio se chargera de le configurer.

**Question :** Un niveau est visible sur la page publiée, mais pas dans l’éditeur.

Réponse : L’extension n’est pas encore active dans l’onglet de votre navigateur. Activez-la
puis rouvrez la page.

**Question :** Sur la page publiée, un titre n’a que la taille d’une balise « H1 », alors que je souhaitais un niveau d’affichage.

Réponse : Le titre n’a pas encore de niveau attribué. Un titre sans niveau sélectionné
est toujours en H1 (32 px) — cela s’applique à tout nouveau titre ainsi qu’aux titres issus
de versions antérieures que l’éditeur affichait encore comme « Display L » ou « Display S »
. Placez le curseur dans le titre, sélectionnez le niveau sous
**« Échelle typographique MAN »** (une étiquette sombre s’affiche alors) et cliquez
sur **Enregistrer**.

**Question :** Après la duplication, la copie a perdu son niveau.

Réponse : C’est un phénomène connu : la copie reçoit un nouvel identifiant sans niveau.
Redéfinissez le niveau sur la copie.

**Question :** Après être passé d’un paragraphe à une balise H2, le titre est de taille normale, alors que « Body L » était défini auparavant.

Réponse : C'est normal : les niveaux « Body » ne s'appliquent qu'aux paragraphes. L'extension supprime
le niveau qui ne correspond plus lors de la prochaine sauvegarde.

**Question :** Dans la boîte de dialogue « Modifier le conteneur », la section « Alignement vertical » est manquante.

Réponse : L’extension n’est pas encore active dans l’onglet de votre navigateur. Activez-la
comme décrit dans « Étape par étape → Activer l’extension »
et rouvrez la boîte de dialogue. Cette section n’apparaît que dans l’onglet
**Mise en page**.

**Question :** Pourquoi ne vois-je pas l’alignement sur la page publiée ?

Réponse : Vérifiez d’abord si les colonnes contiennent des quantités de contenu différentes —
si elles ont la même longueur, il n’y a rien à aligner. Sur smartphone,
les colonnes s’affichent les unes en dessous des autres ; l’alignement n’y est délibérément pas appliqué. Si elle
est également absente sur l’ordinateur de bureau, le CSS personnalisé dans Studio est obsolète. C’est l’
administration de Studio qui s’en charge.

**Question :** Que signifie « comme le conteneur » pour une colonne ?

Réponse : La colonne reprend l’alignement sélectionné ci-dessus pour l’ensemble du conteneur
. Que vous choisissiez « en haut », « au milieu » ou « en bas », ce paramètre s’applique
spécifiquement à cette colonne.

**Question :** Comment désactiver l’extension de débogage dans mon navigateur ?

Réponse : Ouvrez la console de développement du navigateur dans Studio et saisissez
`localStorage.setItem("sbt-typo-scale", "off")`, puis actualisez l'onglet.
Pour la réactiver, utilisez `localStorage.removeItem("sbt-typo-scale")`. Cela ne s'applique
qu'à votre navigateur.
