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
