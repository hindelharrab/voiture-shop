# Voiture Shop — Full Stack

# Pour Docker

## Prérequis
- Docker
- Docker Compose

## Lancer l'application: 
Pour lancer l'application, une seule commande suffit :
- git clone https://github.com/hindelharrab/voiture-shop.git
- cd voiture-shop
- docker-compose up -d --build

### Attendre 2-3 minutes puis accéder à :
http://localhost:5174/login

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

# Pour Kubernetes

## Prérequis
- Docker installé
- Minikube installé
- kubectl installé
  
### 1. Démarrer Minikube
minikube start --driver=docker

### 2. Connecter Docker
minikube docker-env | Invoke-Expression

### 3. Rebuilder les images
- docker build -t springboot-app:1.0 ./backend
- docker build -t voiture-frontend:1.0 ./frontend

### 4. Déployer
- kubectl apply -f k8s/postgres-configMap.yaml
- kubectl apply -f k8s/postgres-secrets.yaml
- kubectl apply -f k8s/db-deployment.yaml
- kubectl apply -f k8s/app-deployment.yaml
- kubectl apply -f k8s/frontend-deployment.yaml

### 5. Accéder
- minikube service frontend-svc --url
- minikube service springboot-app-svc --url
