# Voiture Shop — Full Stack

## Prérequis
- Docker
- Docker Compose

## Lancer l'application

### Une seule commande
docker-compose up -d --build

### Attendre 2-3 minutes puis accéder à :
- Frontend : http://localhost:5174/login

### Identifiants
- Username : admin
- Password : admin123

### Arrêter l'application
docker-compose down

## Modèle IA utilisé 

L'application intègre une fonctionnalité de **conseil automobile par intelligence artificielle**.

### Comment ça fonctionne dans notre application ?

L'utilisateur entre les informations d'un véhicule :
- Marque (ex: Toyota)
- Modèle (ex: Corolla)
- Prix (ex: 95000 MAD)
- Année (ex: 2020)

Le système envoie une question à l'IA : 

"Je veux acheter une Toyota  Corolla de l'année 2020 au prix de 95000 MAD. Est-ce un bon achat ? Quels sont les avantages et inconvénients ?"

L'IA analyse et retourne un conseil personnalisé en français.

