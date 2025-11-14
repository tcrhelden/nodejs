const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hallo! Dit is mijn eerste Node.js webserver!");
});

server.listen(3000, () => {
  console.log("Server draait op http://localhost:3000");
});
