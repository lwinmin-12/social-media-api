const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ msg: "All post are Here" });
});

router.post("/", (req, res) => {
  res.json(req.body);
});

router
  .route("/:id")
  .get((req, res) => res.json({ msg: "Post id is " + req.params.id }))
  .patch((req, res) => res.json({ msg: "patch id is " + req.params.id }));

// router.get("/:id", (req, res) => {
//   let id = req.params.id;req.params.id;
//   res.json({ msg: "Post id is " + id });
// });

//   router.patch("/:id", (req, res) => {
//     let id = req.params.id;
//     res.json({ msg: "patch id is " + id });
//   });

module.exports = router;
