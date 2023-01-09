const router = require("express").Router();

let users = [
  { id: 1, name: "Mg Mg", age: 21 },
  { id: 2, name: "Hla Hla", age: 28 },
  { id: 3, name: "Zaw Zaw", age: 11 },
];

router.get("/", (req, res) => {
  res.json(users);
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  let user = users.find((ea) => ea.id == id);
  if (user) {
    res.json(user);
  } else {
    res.json({ msg: "user not found" });
  }
});

router.post("/", (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let age = req.body.age;

  let user = {
    id,
    name,
    age,
  };
  users.push(user);
  res.json(users);
});

router.patch("/:id", (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let editUser = users.find((ea) => ea.id == id);
  if (editUser) {
    editUser.name = name;
    res.json(users);
  } else {
    res.json({ msg: "User no exit" });
  }
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;
  users = users.filter((ea) => ea.id != id);
  res.json(users);
});

module.exports = router;
