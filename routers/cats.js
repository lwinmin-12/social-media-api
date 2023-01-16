const router = require("express").Router();
const { all, add, get ,update , drop} = require("../controller/catsC");
const { saveImg } = require("../utils/gallary");
const { AddCat, allSchema } = require("../utils/schema");
const { validateBody, validateParams } = require("../utils/validator");

router.get("/", all);
router.post("/", [saveImg, validateBody(AddCat), add]);

router.get("/:id", [validateParams(allSchema.id, "id"), get]);
// router.patch("/:id", [validateParams(allSchema.id, "id"), update]);
router.patch("/:id",saveImg , validateBody(allSchema.image) , update)
router.delete("/:id" , validateParams(allSchema.id , "id") , drop )


module.exports = router;
