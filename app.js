const express = require("express");
const app = express();
app.use(express.json());

const userRoute = require('./routers/user')
const postRoute = require('./routers/posts')

app.use("/users" , userRoute);
app.use("/posts" , postRoute)

app.listen(9000, console.log("server is runing in 9000"));
