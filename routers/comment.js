const router = require("express").Router();

const { add, drop } = require("../controller/comment");
const { CommentSchema, allSchema } = require("../utils/schema");
const {
  validateBody,
  validateToken,
  validateParams,
} = require("../utils/validator");

router.post("/", validateBody(CommentSchema), add);
router.delete("/:id", validateToken, validateParams(allSchema.id, "id"), drop);

module.exports = router;
