const DB = require("../dbS/catsS");
const { fMsg } = require("../utils/helper");

const all = async (req, res, next) => {
  let cats = await DB.find();
  fMsg(res, "All cats", cats);
};
const add = async (req, res, next) => {
  // console.log(req.body)
  let dbCat = await DB.findOne({ name: req.body.name });
  if (dbCat) {
    next(new Error("Category name is already in use"));
    return;
  }
  let result = await new DB(req.body).save();
  fMsg(res, "Category saved", result);
};
const get = async (req, res, next) => {
  let result = await DB.findById(req.params.id);
  fMsg(res, "work", result);
};

const update = async (req, res, next) => {
  let cat = await DB.findById(req.params.id);
  if (cat) {
    await DB.findByIdAndUpdate(cat._id, req.body);
    let result = await DB.findById(req.params.id);
    fMsg(res, "Category updated", result);
  } else {
    next(new Error("404 , Category not found"));
  }
};

const drop = async (req, res, next) => {
  let id = req.params.id;
  let result = await DB.findByIdAndDelete(id);
  fMsg(res , 'Category is deleted' )
};

module.exports = {
  all,
  add,
  get,
  update,
  drop
};
