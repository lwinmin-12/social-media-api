const router = require("express").Router();
const { all, add, get, update, drop } = require("../controller/catsC");
const { saveImg } = require("../utils/gallary");
const { AddCat, allSchema } = require("../utils/schema");
const {
  validateBody,
  validateParams,
  validateToken,
} = require("../utils/validator");

router.get("/", all);
router.post("/", [validateToken, saveImg, validateBody(AddCat), add]);

router.get("/:id", [validateParams(allSchema.id, "id"), get]);
// router.patch("/:id", [validateParams(allSchema.id, "id"), update]);
router.patch(
  "/:id",
  validateToken,
  //   saveImg,
  //   validateBody(allSchema.image),
  validateParams(allSchema.id, "id"),
  update
);
router.delete("/:id", validateToken, validateParams(allSchema.id, "id"), drop);

module.exports = router;
