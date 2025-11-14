Handleiding 3 – Uitbreiding van je Node.js webapp: routes, views en simpele data-opslag

1. Projectstructuur uitbreiden
mijn-webapp/
 ├─ public/
 ├─ views/
 ├─ routes/
 │    └─ users.js
 ├─ data/
 │    └─ users.json
 └─ app.js
Express installeren
npm install express

2. Routes organiseren in een apart bestand (routes/users.js)
const express = require("express");
const router = express.Router();
const fs = require("fs");

const dataPath = "./data/users.json";

router.get("/", (req, res) => {
  const users = JSON.parse(fs.readFileSync(dataPath));
  res.json(users);
});

router.post("/", (req, res) => {
  const users = JSON.parse(fs.readFileSync(dataPath));
  const newUser = req.body;
  users.push(newUser);

  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));

  res.json({ status: "ok", newUser });
});

module.exports = router;

3. Data-bestand (data/users.json)
[]

4. Routes koppelen in app.js
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

const userRoutes = require("./routes/users");

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.listen(port, () => {
  console.log(`Webapp draait op http://localhost:${port}`);
});

5. Frontend formulier (views/index.html)
<!DOCTYPE html>
<html>
<head>
  <title>Mijn Webapp - Gebruikers</title>
</head>
<body>
  <h1>Gebruiker toevoegen</h1>

  <form id="userForm">
    <input type="text" id="name" placeholder="Naam" required>
    <button type="submit">Opslaan</button>
  </form>

  <h2>Gebruikerslijst</h2>
  <ul id="userList"></ul>

  <script>
    const form = document.getElementById("userForm");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;

      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });

      loadUsers();
    });

    async function loadUsers() {
      const users = await fetch("/api/users").then(res => res.json());
      document.getElementById("userList").innerHTML =
        users.map(u => `<li>${u.name}</li>`).join("");
    }

    loadUsers();
  </script>
</body>
</html>

6. App starten
node app.js
