# Serveur HTTP - Challenge Codecrafters (Node.js)

Ce projet est mon implémentation d'un serveur HTTP minimaliste développé entièrement avec Node.js, dans le cadre du [challenge Codecrafters](https://codecrafters.io).

Le but était de construire un serveur capable de gérer des connexions TCP, parser manuellement des requêtes HTTP, et répondre correctement selon les différentes routes demandées.

---

## 🚀 Fonctionnalités

- Gestion de plusieurs connexions TCP simultanées
- Parsing manuel des requêtes HTTP (méthode, chemin, headers, body)
- Prise en charge des routes suivantes :
  - `GET /` → Retourne 200 OK
  - `GET /echo/:message` → Répète le message envoyé dans l'URL
  - `GET /user-agent` → Retourne l'`User-Agent` du client
  - `GET /files/:filename` → Sert un fichier depuis un dossier donné
  - `POST /files/:filename` → Enregistre le contenu envoyé dans un fichier
- Retour des bons codes HTTP (`200`, `201`, `404`, `500`)
- Gestion correcte des en-têtes `Content-Type` et `Content-Length`
- Aucun framework HTTP externe utilisé (pur Node.js)

---

## 🛠 Comment l'exécuter

1. Cloner ce dépôt :
   ```bash
   git clone https://github.com/Louissnsn/codecrafters-http-server.git
   cd codecrafters-http-server
   ```
2. Lancer le serveur en spécifiant un dossier de travail :
   ```bash
   node app.js --directory /chemin/vers/votre/dossier
   ```

🧠 Ce que j'ai appris :

- Gestion des serveurs TCP bas niveau avec Node.js (net module)
- Compréhension fine du protocole HTTP
- Parsing manuel des requêtes HTTP sans librairie
- Manipulation du système de fichiers avec Node.js (fs module)
- Bonne pratique pour la gestion des routes et des statuts HTTP
- Structuration d'un projet minimaliste et maintenable
