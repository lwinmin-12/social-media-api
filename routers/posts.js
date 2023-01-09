const router = require("express").Router();
const { all, get, post, patch, drop } = require("../controller/postC");

router.get("/", all);

router.post("/", post);

router.route("/:id").get(get).patch(patch).delete(drop);
// router.get("/:id", (req, res) => {
//   let id = req.params.id;req.params.id;
//   res.json({ msg: "Post id is " + id });
// });

//   router.patch("/:id", (req, res) => {
//     let id = req.params.id;
//     res.json({ msg: "patch id is " + id });
//   });

module.exports = router;
