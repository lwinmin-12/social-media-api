const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fMsg = async (res, msg = "Success", result = []) => {
  res.status(200).json({
    con: true,
    msg,
    result,
  });
};

const encode = (pass) => bcrypt.hashSync(pass);
const comprass = (plain, hash) => bcrypt.compareSync(plain, hash);
const makeToken = (payload) =>
  jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2h" });

module.exports = {
  fMsg,
  encode,
  comprass,
  makeToken,
};
