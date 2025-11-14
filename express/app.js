const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hallo vanuit de API!" });
});

app.listen(port, () => {
  console.log(`Webapp draait op http://localhost:${port}`);
});
