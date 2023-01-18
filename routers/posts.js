const router = require("express").Router();
const {
  all,
  get,
  post,
  patch,
  drop,
  getCatId,
  getByUser,
  paginate,
  getByTag,
  toggleLike
} = require("../controller/postC");
const { validateToken, validateBody, validateParams } = require("../utils/validator");
const { PostSchema, allSchema } = require("../utils/schema");
const { saveImg } = require("../utils/gallary");

router.get("/", all);

router.post("/", validateToken, saveImg, validateBody(PostSchema), post);

router.route("/:id").get(get).patch(validateToken, patch).delete(drop);

router.get("/bycat/:id", validateParams(allSchema.id, "id"), getCatId);
router.get("/byuser/:id", validateParams(allSchema.id, "id"), getByUser);
router.get("/bytag/:id", validateParams(allSchema.id, "id"), getByTag);
router.get("/like/toggle/:id/:page", validateParams(allSchema.id, "id"), toggleLike);


router.get("/pagination/:page" , validateParams(allSchema.page , 'page') , paginate)

module.exports = router;
