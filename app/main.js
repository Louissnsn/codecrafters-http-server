const net = require("net");

const server = net.createServer((socket) => {
  socket.on("close", () => {
    socket.end();
  });


  socket.on("data", (data) => {
    const lines = data.toString().split("\r\n");
     console.log("lines", lines);
    const path = data.toString().split(" ")[1];
    if (path == "/") {
      socket.write("HTTP/1.1 200 OK\r\n\r\n");
    } else if (path.includes("echo")) {
      const content = path.split("/echo/")[1];
      socket.write(
        `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${content.length}\r\n\r\n${content}`
      )
    } 
    else if(path.includes("user-agent")){
      console.log("User-Agent has been found in the path");
      const userAgent = lines[2].split(": ")[1];
      console.log("User-Agent", userAgent);

      socket.write(
        `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${userAgent.length}\r\n\r\n${userAgent}`
      )
    }
     else {
      socket.write(`HTTP/1.1 404 Not Found\r\n\r\n`);
    }
  });
});

server.listen(4221, () => {
  console.log("Server is running on port 4221");
}
);
