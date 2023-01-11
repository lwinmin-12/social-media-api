const fs = require("fs");

const saveImg = (req, res, next) => {
  let file = req.files.file;
  let fileName = new Date().valueOf() + "_" + file.name;
  file.mv(`upload/${fileName}`);
  req.imageName = fileName;
  next();
};

const saveImgs = (req, res, next) => {
  let fileNames = [];
  let files = req.files.files;
  files.forEach((ea) => {
    let fileName = new Date().valueOf() + "_" + ea.name;
    ea.mv(`upload/${fileName}`);
    fileNames.push(fileName);
  });
  req.body["images"] = fileNames;
  //  console.log(fileNames)
  next();
};
const delImg = async (fileName) => {
  // let fileName = req.body.name;
  await fs.unlinkSync(`upload/${fileName}`);
  console.log(fileName);
};

module.exports = {
  saveImg,
  saveImgs,
  delImg,
};
