const DB = require("../dbS/postS");
const { fMsg } = require("../utils/helper");

const all = async (req, res) => {
  let result = await DB.find().populate("user" , '-password');
  fMsg(res, "All Post", result);
};
const get = async (req, res) => {
  let id = req.params.id;
  let result = await DB.findById(id).populate("user");
  fMsg(res, "each post", result);
};
const post = async (req, res) => {
  let savePost = new DB(req.body);
  let result = await savePost.save();
  fMsg(res, "Post added ", result);
};
const patch = async (req, res, next) => {
  let id = req.params.id;
  let user = await DB.findById(id);
  if (user) {
    await DB.findByIdAndUpdate(user._id, req.body);
    let result = await DB.findById(id);
    fMsg(res, "User Updated", result);
  } else {
    next(new Error("404 , user not found"));
  }
};
const drop = async (req, res) => {
  let id = req.params.id;
  let user = await DB.findById(id);
  if (user) {
    await DB.findByIdAndDelete(id);
    fMsg(res, "Deleted");
  } else {
    next(new Error("404 , user not found. So we cannot delete"));
  }
};

module.exports = {
  all,
  get,
  post,
  patch,
  drop,
};
