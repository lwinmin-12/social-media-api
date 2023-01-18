const DB = require("../dbS/postS");
const commentDB = require("../dbS/comment");
const { fMsg } = require("../utils/helper");

const all = async (req, res) => {
  let result = await DB.find().populate("user cat", "-password -__v");
  fMsg(res, "All Post", result);
};
const get = async (req, res) => {
  let id = req.params.id;
  let result = await DB.findById(id).populate("user cat", "-__v -_id -create -password");
  let comments = await commentDB.find({ postId: result._id });
  result = result.toObject();
  result["comments"] = comments;
  fMsg(res, "each post", result);
};
const post = async (req, res) => {
  let userId = req.body.user._id;
  delete req.body.user;
  req.body.user = userId;
  let result = await new DB(req.body).save();
  // let result = await savePost.;
  fMsg(res, "Post added ", result);
  // fMsg(res, "work");
};
const patch = async (req, res, next) => {
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
    await DB.findByIdAndDelete(user._id);
    fMsg(res, "Deleted");
  } else {
    next(new Error("404 , user not found. So we cannot delete"));
  }
};

const getCatId = async (req, res, next) => {
  let id = req.params.id;

  let result = await DB.find({ cat: id }).populate("user");
  fMsg(res, "all Same Cat", result);
};

const getByUser = async (req, res, next) => {
  let id = req.params.id;
  let result = await DB.find({ user: id });
  fMsg(res, "all post by user", result);
};
const getByTag = async (req, res, next) => {
  let id = req.params.id;

  let result = await DB.find({ tag: id });
  fMsg(res, "all post by tag", result);
};
const paginate = async (req, res, next) => {
  let page = req.params.page;
  page = page == 1 ? 0 : page - 1;
  let limit = Number(process.env.POST_LIMIT);
  let skipCount = limit * page;
  let posts = await DB.find().skip(skipCount).limit(limit);
  fMsg(res, "Paginated Post", posts);
};

const toggleLike = async (req, res, next) => {
  let id = req.params.id;
  let post = await DB.findById(id);
  // console.log(post);
  if (post) {
    let page = req.params.page;
    if (page == 1) {
      post.like = post.like + 1;
    } else {
      post.like = post.like - 1;
    }
    await DB.findByIdAndUpdate(id, post);
    let result = await DB.findById(id);
    fMsg(res, "post is liked", result);
  }
};

module.exports = {
  all,
  get,
  post,
  patch,
  drop,
  getCatId,
  getByUser,
  paginate,
  getByTag,
  toggleLike,
};
