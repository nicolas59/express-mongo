# Introduction
Ce projet a pour objectif de fournir une introduction à kubernetes à travers le déploiement d'une application express-mongo.

# Pre-requis 
 * Installation de minikube
 * Installation de kubectl
 * NodeJs pour les tests locaux

#Initialisation de minikube
Pour initialiser la vm contenant **kubernetes** : 
`minikube start`

**Minikube** met à disposition une interface graphique pour obtenir son url :
`minikube dashboard`

# Création des images docker
Le repertoire **app** contient une application **node** permettant de restituer les bornes Wifi disponible à Paris. Les informations sur ces bornes sont extrait à partir d'un flux **opendata** et stocker dans une base de données **mongo**.

2 fichiers Dockerfile et DockerfileLoader permettent de créer les images :
- Image de l'application founissant l'api
- Image permettant de consommer le flux et de le stocker en base de données **mongo**

Pour la génération des images, veuiller executer les commandes :

```shell
docker build -t express-mongo:1.0.4 .
docker build -t express-mongo-loader:1.0.0 -f DockerfileLoader .
```

Note : Pour contruire les images, il est plus simple de les contruire directement dans le vm créer par Minikube.

Pour accéder à cet vm :

`minikube ssh`

Puis cloner le projet git afin d'executer les commandes de contruction. De cette manière, les images seront directement accessible par **kubernetes**.
 


# Mise en place de traefik
Traefik permet de mettre en place un **load balancer** au niveau des containers. Ce service utilise diverses régles permettant de router vers les containers. Le fichier **pod-traefik-ui.yml** permette de créer : 
- de créer le service traefik
- de deployer le container traefik-ui 
- de mettre en place une regle de redirection vers l'interface graphique de traefik.

Executer la commande :

`kubectl apply -f pod-traefik-ui.yml`

# Deploiement de mongo
Mongodb, base de données noSQL,  permettra de stocker les données sur les bornes wifi. Le fichier **pod-mongo.yml** réalise le deploiement du pod : 
- du container mongo
- du service permettant d'accéder au conainer

Executer la commande : 

`kubectl apply -f pod-mongo.yml`

# Deploiement du replicaSet express-mongo
Il s'agit de l'application permettant de fournir l'API pour l'accés aux bornes Wifi. Le fichier **rs-express-mongo.yml** permet : 
- de deployer un InitContainer associé à l'image express-mongo-loader. Cet init container aura pour objectif de remplir la base de données. Vue qu'il s'agit d'un Init Container, celui-ci s'arretera une fois l'insertion du contenu réalisé.
- de déployer le container express-mongo, point d'accés à l'API

Executer la commande : 

`kubectl apply -f rs-express-mongo.yml`

# Deploiement du service express-mongo
Ce service va permettre d'accéder à nos différents pods intégrant l'API et sera le point d'accés à l'ingress.

Executer la commande : 

 `kubectl apply -f srv-express-mongo.yml`

# Deploiement de l'ingress express-mongo
Cette derniere étape permet de rendre accéssible notre service via traefik en utilisant le domaine **express-mongo.minikube**.

Executer la commande : 

`kubectl apply -f ing-express-mongo.yml`

Apres avoir modifié le fichier /ets/hosts ou C:\Windows\System32\drivers\etc afin d'associer l'ip de **minikube** au domaine **express-mongo.minikube**, l'API est accessible à cette url : **http://express-mongo.minikube/borne**