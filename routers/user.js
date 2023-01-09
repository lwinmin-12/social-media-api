const router = require("express").Router();

const {get , getAll, post, patch, drop} = require('../controller/userC')


router.get("/", getAll);

router.get("/:id", get);

router.post("/", post);

router.patch("/:id", patch);

router.delete("/:id", drop);

module.exports = router;
