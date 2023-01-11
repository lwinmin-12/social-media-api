require("dotenv").config();
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const { fMsg } = require("./utils/helper");
const path = require('path')

app.use(express.json());
app.use(fileUpload());
app.use('/upload' , express.static(path.join(__dirname , 'upload')))

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://lmo:asdffdsa@cluster0.cuqab5p.mongodb.net/?retryWrites=true&w=majority"
);

const userRoute = require("./routers/user");
const postRoute = require("./routers/posts");
const { saveImg, saveImgs, delImg } = require("./utils/gallary");

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

// app.post("/gallery", async (req, res, next) => {
//   await delImg(req.body.name);
//   res.json({ msg: "file deleted" });
// });

app.post("/gallery", saveImg, async (req, res, next) => {
  fMsg(res, "File Uploaded");
});

// app.post("/gallery", saveImgs, async (req, res, next) => {
//   fMsg(res, "All Of Files Are Uploaded");
// });

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
