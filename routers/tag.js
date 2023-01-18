const router = require("express").Router();
const { get, add, getOne, update, drop } = require("../controller/tagC");
const { saveImg } = require("../utils/gallary");
const {
  validateBody,
  validateToken,
  validateParams,
} = require("../utils/validator");
const { AddCat, allSchema } = require("../utils/schema");
// const { update } = require("../controller/catsC");

router.get("/", get);
router.post("/", [validateToken, saveImg, validateBody(AddCat), add]);

router
  .route("/:id")
  .get(validateParams(allSchema.id), getOne)
  .patch([validateToken, validateParams(allSchema.id, "id"), update])
  .delete([validateToken, validateParams(allSchema.id, "id"), drop]);

module.exports = router;
