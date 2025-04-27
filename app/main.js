// On importe les modules nécessaires
const net = require("net"); // Pour créer un serveur TCP
const fs = require("fs"); // Pour lire les fichiers sur le disque
const path = require("path"); // Pour construire les chemins de fichiers

// Lire le répertoire spécifié via --directory en ligne de commande
const args = process.argv;
const directoryFlagIndex = args.indexOf("--directory");
const directory = args[directoryFlagIndex + 1]; // Le chemin du dossier de fichiers

// Création du serveur
const server = net.createServer((socket) => {
  // À chaque connexion, on écoute l'événement "data"
  socket.on("data", (data) => {
    const lines = data.toString().split("\r\n"); // On découpe la requête en lignes
    const requestPath = data.toString().split(" ")[1]; // On récupère seulement le chemin demandé (ex: /files/hello.txt)

    // Si la requête est pour la racine "/"
    if (requestPath === "/") {
      socket.write("HTTP/1.1 200 OK\r\n\r\n");

      // Si la requête est de type /echo/{contenu}
    } else if (requestPath.startsWith("/echo/")) {
      const content = requestPath.split("/echo/")[1];
      socket.write(
        `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${content.length}\r\n\r\n${content}`
      );

      // Si la requête est de type /user-agent
    } else if (requestPath.startsWith("/user-agent")) {
      // On cherche la ligne User-Agent dynamiquement
      const userAgentLine = lines.find((line) =>
        line.toLowerCase().startsWith("user-agent:")
      );
      const userAgent = userAgentLine?.split(": ")[1] || "Unknown";

      socket.write(
        `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${userAgent.length}\r\n\r\n${userAgent}`
      );

      // Si la requête est de type /files/{filename}
    } else if (requestPath.startsWith("/files/")) {
      // Extraire le nom du fichier demandé
      const fileName = requestPath.slice("/files/".length);
      // Construire le chemin complet vers le fichier
      const filePath = path.join(directory, fileName);

      // Lire le fichier
      fs.readFile(filePath, (err, fileContent) => {
        if (err) {
          // Si le fichier n'existe pas, on répond avec 404
          socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
          socket.end();
        } else {
          // Si le fichier existe, on l'envoie avec 200 OK
          socket.write("HTTP/1.1 200 OK\r\n");
          socket.write("Content-Type: application/octet-stream\r\n");
          socket.write(`Content-Length: ${fileContent.length}\r\n`);
          socket.write("\r\n"); // Ligne vide obligatoire entre headers et corps
          socket.write(fileContent); // Envoie du contenu du fichier
          socket.end();
        }
      });

      // Si la route demandée n'est pas reconnue
    } else {
      socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
    }
  });
});

// Le serveur écoute sur le port 4221
server.listen(4221, () => {
  console.log("Server is running on port 4221");
});
