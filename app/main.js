const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  socket.on("close", () => {
    socket.end();
  });
  socket.on("data", (data) => {
    console.log("data", data);
    const path = data.toString().split(" ")[1];
    if (path == "/") {
      socket.write("HTTP/1.1 200 OK\r\n\r\n");
    } else if (path.includes("echo")) {
      const content = path.split("/echo/")[1];
      socket.write(
        `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${content.length}\r\n\r\n${content}`
      );
    } else {
      socket.write(`HTTP/1.1 404 Not Found\r\n\r\n`);
    }
  });
});

server.listen(4221, "localhost");
