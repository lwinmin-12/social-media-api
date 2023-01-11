require("dotenv").config();
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(fileUpload());

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://lmo:asdffdsa@cluster0.cuqab5p.mongodb.net/?retryWrites=true&w=majority"
);

const userRoute = require("./routers/user");
const postRoute = require("./routers/posts");

const franky = (req, res, next) => {
  console.log(req.complete);
};
const islogin = (req, res, next) => {
  if (1 + 2 == 3) {
    req.successMsg = "you are logged in";
    next();
  } else {
    next(new Error("Error , Login pls"));
  }
};
const isAdmin = (req, res, next) => {
  if (1 + 3 == 4) {
    console.log(req.successMsg);
    req.complete = "your am admin";
    next();
  } else {
    next(new Error("Error , your not am admin"));
  }
};

const saveImg = (req, res, next) => {
  // console.log(req.files);
  let file = req.files.file;
  let fileName = new Date().valueOf() + "_" + file.name;
  file.mv(`upload/${fileName}`);
  req.imageName = fileName;
  next()
};

app.post("/gallery", saveImg, (req, res, next) => {
  res.json({ "msg": "file Uploaded", "fileName": req.imageName });
});
app.use("/users", islogin, isAdmin, userRoute);
// app.use("/users", userRoute);
app.use("/posts", postRoute);

app.use((err, req, res, next) => {
  //   console.log(err);
  err.status = err.status || 200;
  res.status(err.status).json({
    con: false,
    msg: err.message,
  });
});

app.listen(process.env.PORT, console.log("server is runing in 9000"));
