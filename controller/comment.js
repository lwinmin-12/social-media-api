const DB = require("../dbS/comment");
const { fMsg } = require("../utils/helper");

const add = async (req, res, next) => {
  // console.log("work")
  let result = await new DB(req.body).save();
  fMsg(res , "comment added" , result)
};


const getAll = async(req , res , next)=>{
 let result = await DB.find()
 fMsg(res , "all comment" , result)
}
const drop = async (req, res, next) => {
    let id = req.params.id;
    let comment = await DB.findById(id);
    if (user) {
      await DB.findByIdAndDelete(comment._id);
      fMsg(res, "Deleted");
    } else {
      next(new Error("404 , user not found. So we cannot delete"));
    }
  };
  module.exports={
    getAll,drop,add
  }