const router = require("express").Router();
const {
  all,
  get,
  post,
  patch,
  drop,
  getCatId,
  getByUser,
} = require("../controller/postC");
const { validateToken, validateBody } = require("../utils/validator");
const { PostSchema } = require("../utils/schema");
const { saveImg } = require("../utils/gallary");

router.get("/", all);

router.post("/", validateToken, saveImg, validateBody(PostSchema), post);

router.route("/:id").get(get).patch(validateToken, patch).delete(drop);

router.get("/bycat/:id", getCatId);
router.get("/byuser/:id", getByUser);

module.exports = router;
