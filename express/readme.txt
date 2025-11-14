Handleiding 2 – Een eenvoudige webapplicatie bouwen met Node.js + Express

1. Nieuw project aanmaken
mkdir mijn-webapp
cd mijn-webapp
npm init -y

2. Installeer Express.js
npm install express

3. Mapstructuur
mijn-webapp/
 ├─ public/
 ├─ views/
 └─ app.js

4. Server (app.js)
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

5. Homepage (views/index.html)
<!DOCTYPE html>
<html>
<head>
  <title>Mijn Webapp</title>
</head>
<body>
  <h1>Welkom in mijn eerste Node.js webapp!</h1>
  <p>Dit is een simpele webpagina via Express.js.</p>
  <a href="/api/hello">API voorbeeld</a>
</body>
</html>

6. Stylesheet (public/style.css)
body {
  font-family: Arial;
  padding: 20px;
  background: #f2f2f2;
}

7. App starten
node app.js
Ga naar http://localhost:3000 en /api/hello
