# Test pré-embauche panasonic
Ce repos contient tout les documents relatif au test dans le dossier './doc/test'.

## Déploiment de la solution
### Creation de la base de données postgresql sous linux
Effectué les commande suivante dans le TERMINAL :
1. sudo -i -u postgres psql
1. CREATE USER panasonic WITH LOGIN PASSWORD 'password';
1. CREATE DATABASE panasonic OWNER panasonic;