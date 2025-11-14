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
