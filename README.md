<b> gRPC Service avec Reverse Proxy </b>

<b> OBJECTIF(S) </b>

<p>Mettre en place un service gRPC capable de recevoir des requêtes et de renvoyer des réponses structurées via un protocole de communication performant.</p>
<p>Créer un reverse proxy servant d'interface pour les clients et redirigeant les requêtes vers le service gRPC.</p>

<b> OUTILS UTILISÉS </b>

<ul>
  <li>Node.js</li>
  <li>Protocol Buffers (Protobuf)</li>
  <li>gRPC</li>
  <li>ProtoLoader</li>
  <li>WebSocket</li>
</ul>

<b> DESCRIPTION DU PROJET </b>

<p>Ce projet implémente un service gRPC de chat en temps réel avec un reverse proxy utilisant WebSocket. Voici les composants principaux du système :</p>

<ul>
  <li><b>gRPC Service</b> : Ce service fournit une interface de communication pour récupérer un utilisateur, envoyer des messages et obtenir l'historique des messages dans une salle de chat.</li>
  <li><b>Proxy WebSocket</b> : Ce proxy permet aux clients WebSocket de se connecter au service gRPC pour envoyer et recevoir des messages en temps réel via un flux bidirectionnel.</li>
  <li><b>Client WebSocket</b> : Une interface simple en HTML et JavaScript qui permet aux utilisateurs de se connecter au serveur WebSocket et d'envoyer/recevoir des messages dans une salle de chat.</li>
</ul>

<b> DÉPLOIEMENT </b>

<p>Pour démarrer ce projet, suivez ces étapes :</p>

<ol>
  <li><b>Installer les dépendances</b> :
    <pre>npm install</pre>
  </li>
  <li><b>Lancer le serveur gRPC</b> :
    <pre>node server.js</pre>
  </li>
  <li><b>Lancer le proxy WebSocket</b> :
    <pre>node proxy.js</pre>
  </li>
  <li><b>Ouvrir le client WebSocket</b> :
    <p>Ouvrir le fichier <code>client.html</code> dans un navigateur.</p>
  </li>
</ol>

<b> STRUCTURE DU CODE </b>

<p>Voici une vue d'ensemble des fichiers inclus dans ce projet :</p>

<ul>
  <li><b>chat.proto</b> : Définition des services et messages gRPC utilisés par le serveur et le proxy.</li>
  <li><b>server.js</b> : Implémentation du serveur gRPC qui gère les requêtes des clients, y compris la gestion des utilisateurs et l'envoi/réception de messages de chat.</li>
  <li><b>proxy.js</b> : Implémentation du proxy WebSocket qui interagit avec le serveur gRPC pour fournir une interface WebSocket aux clients.</li>
  <li><b>client.html</b> : Interface WebSocket en HTML et JavaScript pour envoyer et recevoir des messages via un WebSocket.</li>
</ul>

<b> FONCTIONNALITÉS PRINCIPALES </b>

<ul>
  <li><b>GetUser</b> : Permet de récupérer les informations d'un utilisateur par son ID.</li>
  <li><b>Chat</b> : Permet l'envoi de messages dans une salle de chat via un flux bidirectionnel gRPC.</li>
  <li><b>GetChatHistory</b> : Récupère l'historique des messages d'une salle de chat donnée.</li>
  <li><b>WebSocket Proxy</b> : Permet aux clients de se connecter via WebSocket et d'interagir avec le service gRPC.</li>
</ul>

<b> NOTES </b>

<p>Les messages sont stockés en mémoire et ne sont pas persistés dans une base de données. Cette architecture est adaptée pour des tests et des démonstrations, mais pour un usage en production, il serait nécessaire d'ajouter un système de stockage persistant.</p>
