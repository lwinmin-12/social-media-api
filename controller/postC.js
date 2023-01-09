const router = require("express").Router();

const all = async (req, res) => {
  res.json({ msg: "All post are Here" });
};
const get = async (req, res) => {
  res.json({ msg: "get are Here" });
};
const post = async (req , res) =>{
    res.json({ msg: "post are Here" });
}
const patch = async (req, res) => {
  res.json({ msg: "patch are Here" });
};
const drop = async (req, res) => {
  res.json({ msg: "delete are Here" });
};

module.exports = {
  all,
  get,
  post,
  patch,
  drop,
};
