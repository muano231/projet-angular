# ProjetAngular

Ce projet est un site pour suivre toutes les courses de la saison actuelle en formule 1, et de participer en votant sur le gagnant de la prochaine courses.
Il est possible de voir :
    * Les courses à venir et les votes en cours
    * Le résultat des votes des courses passées
    * Le classement actuel des pilotes
    * Le classement actuel des constructeurs
    * Le calendrier complet de la saison

Projet fait par Léo TERRAS - Angular en entreprise

## Lancer l'application
Télécharger le projet :
    * « git clone https://github.com/muano231/projet-angular.git »
    * Télécharger les nodes_modules : « npm install »

Pour lancer l'application en local :
    * Lancer le projet dans le cli avec « ng serve »

Pour héberger l'application :
    * Build le projet : « ng build --prod »
    * Récupérer l'application compilée et la mettre sur la plateforme de l'hébergeur.

## Configuration
Pour ajouter une base de données firebase, il faut lancer la commande suivante :
    « firebase init »

Une fois la commande effectuée, il faut soit ajouter une projet firebase existant ou en créer un nouveau depuis la cli.

## Structure de l'application
L'utilisateur se connecte sur le projet.
L'application récupère des données d'une api et les affiche à l'utilisateur.
L'application est connectée à une base de données, qui contient la liste des utilisateurs et des votes.

## Librairies utilisées
Les librairies utilisées pour ce projet sont les suivantes :
    * Ergast (http://ergast.com/), pour l'api
    * I18next (angular-i18next / i18next-browser-languagedetector), pour la traduction sur le site
    * Firebase, pour la base de donnée
    * Xml2js, pour convertir le résultat de l'api (en xml), en json

## Organisation du code
### composants
Chaque page du site à son propre composant.
Ils sont appelés dans le composant "app.component.html" selon la route du projet. 
Les seuls composants qui sont tout le temps appelés sont la navbar et le footer.

### services
Les appels à l'api ou à la base de données sont faits au sein d'un service.
Cela permet de factoriser le code et de simplement à avoir à appeler la function du service, plutôt que de la recréer à chaque fois.
Il y a également un service pour l'authentification, l'auth-guard et la conversion d'une chaine xml en json.

### gestion de la langue
Pour ce qui est de la traduction, lors de la connexion la langue par défaut est l'anglais.
A cause de soucis dus à la traduction de dates (récupérées de l'api), la seule langue du projet est l'anglais.
Mais il est possible de réactiver la traduction en français, le code est encore présent.
Lorsque la langue est connue, il faut appeler la directive translate, qui va convertir le mot clé souhaité, en sa traduction.
Le mot clé est connu dans le fichier "langue.translation.json", qui est associé à sa traduction.

## Fonctionnalités de l'application
Lorsque l'on arrive sur l'application, on a accès aux pages suivantes :
    * Home
    * Polls
    * Drivers
    * Constructors
    * Races

Sur chaque page il est possible de voir le contenu de celle-ci, mais il est impossible de placer un vote ou de visualiser la liste des votes (par grand prix).
Pour accéder à la page de vote d'un grand prix, il faut se connecter.
Pour cela, dans la navbar, il y a :
    * Un bouton de connexion, si l'utilisateur à déjà créé un compte
    * Un bouton de création de compte s'il n'en a pas.

Une fois connecté, sur la page d'accueil, il est possible de voter sur la prochaine course.
Pour voter, il faut cliquer sur le pilote que l'on souhaite dans la liste affichée.
Pour le valider, un bouton "vote" en pied de page est présent.
Une fois le vote validé, la liste des pilotes, triés par leur classement, est affichée avec le total de leurs votes.
Il est également possible de modifier ou de supprimer son vote.

Sur la page polls, on retrouve la liste des grand prix passés, avec le bouton "votes", qui nous affiche la liste de tous les votes sur cette course.

## Axes d'amélioration
Dans l'état, le site est fonctionnel, mais il est possible de le faire évoluer sur les points suivants :
    * Gestion des langues, seul la langue anglaise est disponible
    * Ajouter de la sécurité sur le mot de passe avec l'ajout d'un hash par exemple
    * Prévoir un systeme de vote plus poussé, avec la possibilté de voter sur les qualifs ou courses sprint
    * Revoir les données / affichage des données dans le session storage (peut-être utiliser des cookies)
    * Paufiner le CSS (responsive + utliser plus de classes)
