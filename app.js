require("dotenv").config();
const express = require("express");
const app = express();

const fileUpload = require("express-fileupload");
const { fMsg } = require("./utils/helper");
const path = require("path");

app.use(express.json());
app.use(fileUpload());
app.use("/upload", express.static(path.join(__dirname, "upload")));

const mongoose = require("mongoose");
mongoose.connect(process.env.DATA_BASE);

const userRoute = require("./routers/user");
const postRoute = require("./routers/posts");
const catsRoute = require("./routers/cats");
const tagRoute = require("./routers/tag");
const commentRoute = require("./routers/comment");

app.use("/category", catsRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/tag", tagRoute);
app.use("/comment", commentRoute);

app.use((err, req, res, next) => {
  //   console.log(err);
  err.status = err.status || 200;
  res.status(err.status).json({
    con: false,
    msg: err.message,
  });
});

app.listen(
  process.env.PORT,
  console.log(`server is runing in ${process.env.PORT}`)
);
