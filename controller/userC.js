const DB = require("../dbS/userS");
const { fMsg, encode, comprass , makeToken } = require("../utils/helper");

const login = async (req, res, next) => {
  // fMsg(res, "login successful", req.body);
  // console.log(req.body.password);
  // console.log(password);
  // console.log('work')
  let phoneUser = await DB.findOne({ phone: req.body.phone }).select("-__v");
  if (phoneUser) {
    if (comprass(req.body.password, phoneUser.password)) {
      // let token = makeToken(phoneUser.toObject())
      // phoneUser.to = token
      let user = phoneUser.toObject()
      delete user.password
      user.token = makeToken(user)
      // console.log(token)
      fMsg(res, "login Success", user);
    } else {
      next(new Error("Creditial Error"));
    }
  } else {
    next(new Error("Creditial Error"));user
  }
};
const register = async (req, res, next) => {
  let nameUser = await DB.findOne({ name: req.body.name });
  if (nameUser) {
    next(new Error("User name is existed"));
    return;
  }
  let emailUser = await DB.findOne({ email: req.body.email });
  if (emailUser) {
    next(new Error("Email name is existed"));
    return;
  }
  let phone = await DB.findOne({ phone: req.body.phone });
  if (phone) {
    next(new Error("Phone name is existed"));
    return;
  }
  req.body.password = encode(req.body["password"]);
  let result = await new DB(req.body).save();

  fMsg(res, "New user created", result);
};

module.exports = {
  login,
  register,
};
