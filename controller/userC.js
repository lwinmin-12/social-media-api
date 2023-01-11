const DB = require("../dbS/userS");
const Helper = require("../utils/helper");

const getAll = async (req, res, next) => {
  let users = await DB.find();
  Helper.fMsg(res, "All Users", users);
  // res.status(200).json({
  //   con: true,
  //   msg: "All Users",
  //   result: users,
  // });
};

const get = async (req, res, next) => {
  let id = req.params.id;
  let user = await DB.findById(id);
  Helper.fMsg(res, "One user", user);
  // res.status(200).json({
  //   con: true,
  //   msg: "One Users",
  //   result: [],
  // });
};

const post = async (req, res, next) => {
  let saveUser = new DB(req.body);
  let result = await saveUser.save();
  Helper.fMsg(res, "User Added", result);
};

const patch = async (req, res, next) => {
  // req id
  let id = req.params.id;
  // data
  let user = await DB.findById(id);
  let update = req.body;
  if (user) {
    await DB.findByIdAndUpdate(user._id, update);
    let result = await DB.findById(user._id);
    Helper.fMsg(res, "Updated", result);
  } else {
    next(new Error("Error , No User with that id"));
  }
};

const drop = async (req, res, next) => {
  let id = req.params.id;
  let user = await DB.findById(id);
  if (user) {
    await DB.findByIdAndDelete(id);
    Helper.fMsg(res, "Deleted");
  } else {
    next(new Error("Error , No User with that id"));
  }
};

module.exports = {
  get,
  getAll,
  post,
  patch,
  drop,
};