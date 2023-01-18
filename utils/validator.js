const jwt = require("jsonwebtoken");
// const { findById } = require("../dbS/userS");
const userDB = require("../dbS/userS");
module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error) {
        next(new Error(result.error.details[0].message));
      } else {
        next();
        // console.log("wk");
      }
    };
  },
  validateParams: (schema, name) => {
    return (req, res, next) => {
      //id check
      let obj = {};
      obj[`${name}`] = req.params[`${name}`];
      let result = schema.validate(obj);
      // console.log(schema , obj)
      if (result.error) {
        next(new Error(result.error.details[0].message));
      } else {
        next();
      }
    };
  },
  validateToken: async (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let decodeUser = jwt.decode(token, process.env.SECRET_KEY);
      let loginedUser = await userDB.findById(decodeUser._id);
      if (loginedUser) {
        req.body["user"] = loginedUser;
        // console.log(req.body);
        next();
      } else {
        next(new Error("Tokenization error"));
      }
    } else {
      next(new Error("Tokenization error"));
    }
  },
};
