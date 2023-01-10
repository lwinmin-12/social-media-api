require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://lmo:asdffdsa@cluster0.cuqab5p.mongodb.net/?retryWrites=true&w=majority"
);

const userRoute = require("./routers/user");
const postRoute = require("./routers/posts");

app.use("/users", userRoute);
app.use("/posts", postRoute);

app.use((err, req, res, next) => {
//   console.log(err);
err.status = err.status || 200 ;
res.status(err.status).json({
    con:false,
    msg:err.message
})
});

app.listen(process.env.PORT, console.log("server is runing in 9000"));
