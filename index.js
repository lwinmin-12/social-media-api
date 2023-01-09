const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  res.status(200).json({ name: "Mg Mg", age: 21, subject: "node js" });
});

app.post("/user", (req, res) => {
  res.status(201).json({ msg: "User Register Success" });
});

app.patch("/user/:id/:name", (req, res) => {
  let id = req.params.id;
  let name = req.params.name;

  res.status(200).json({ id, name });
});

app.delete("/user/:id", (req, res) => {
  let id = req.params.id;
  res.json({ msg: "delete id is" + id });
});
// * must be button

app.get("*", (req, res) => {
  res.json({ msg: "404 not found" });
});

app.listen(9000, console.log("server is runing in 9000"));
