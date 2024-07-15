# Test pré-embauche panasonic
Ce repos contient tout les documents relatif au test dans le dossier './doc/test'.

## Déploiment de la solution

### Creation de la base de données postgresql sous linux
Effectué les commande suivantes dans le TERMINAL :
1. sudo -i -u postgres psql
1. CREATE USER panasonic WITH LOGIN PASSWORD 'password';
1. CREATE DATABASE panasonic OWNER panasonic;

### Intallation des packages
npm init
npm i

### Variable d'environnement
Créer un fichier .env à la racine du projet respectant les informations contenu dans le fichier .env.exemple.

### Creation des tables
npm run db:create

### Remplir les tables de fausse données de test
npm run db:seed

### Test de l'exercice 1
npm run test:exercice1

### Lance le serveur avec rechargement à chaud
npm run dev:back

### Lance le serveur avec rechargement à chaud
npm run dev:front
