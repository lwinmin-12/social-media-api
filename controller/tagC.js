const DB = require("../dbS/tag-model");
const { fMsg } = require("../utils/helper");

const get = async (req, res, next) => {
  let result = await DB.find();
  fMsg(res, "Get All Tag", result);
};

const add = async (req, res, next) => {
  const userTag = await DB.findOne({ name: req.body.name });
  if (userTag) {
    next(new Error("Tag name is already exist"));
  } else {
    const result = await new DB(req.body).save();
    fMsg(res, "New Tag Created", result);
  }
};

const getOne = async (req, res) => {
  let id = req.params.id;
  let result = await DB.findById(id);
  fMsg(res, "each post", result);
};


const update = async (req, res, next) => {
    let id = req.params.id;
    let user = await DB.findById(id);
    if (user) {
      await DB.findByIdAndUpdate(user._id, req.body);
      let result = await DB.findById(id);
      fMsg(res, "Post Updated", result);
    } else {
      next(new Error("404 , Post not found"));
    }
  };
const drop = async (req, res, next) => {
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
  get,
  add,
  getOne,
  update,
  drop
};
