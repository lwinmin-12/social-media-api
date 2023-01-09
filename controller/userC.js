let users = [
    { id: 1, name: "Mg Mg", age: 21 },
    { id: 2, name: "Hla Hla", age: 28 },
    { id: 3, name: "Zaw Zaw", age: 11 },
  ];

const getAll = async (req, res, next) => {
    res.json(users);
};

const get = async (req, res, next) => {
    let id = req.params.id;
    let user = users.find((ea) => ea.id == id);
    if (user) {
      res.json(user);
    } else {
      res.json({ msg: "user not found" });
    }
};

const post = async (req, res, next) => {
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
};

const patch = async (req, res, next) => {
    let id = req.params.id;
  let name = req.body.name;
  let editUser = users.find((ea) => ea.id == id);
  if (editUser) {
    editUser.name = name;
    res.json(users);
  } else {
    res.json({ msg: "User no exit" });
  }
};

const drop = async (req, res, next) => {
    let id = req.params.id;
    users = users.filter((ea) => ea.id != id);
    res.json(users);
};

module.exports = {
  get,
  getAll,
  post,
  patch,
  drop

};
