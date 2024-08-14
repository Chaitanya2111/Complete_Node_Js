const express = require("express");
const users = require("./userData.json");
const app = express();
const fs = require("fs");
const PORT = 8000;

app.get("/api/users", (req, res) => {
  res.send(users);
});

app.get("/users", (req, res) => {
  const html = `<ul>${users.map((user) => `<li>${user.first_name}</li> <li>${user.last_name}</li>`).join("")}</ul>`;
  res.send(html);
});

app.get("/api/usersr", (req, res) => {
res.setHeader('myName','chaitanya raut')
return res.json(users)
});

app.listen(PORT, () => console.log(`server is started on port ${PORT}`));
