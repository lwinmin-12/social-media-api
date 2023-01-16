const router = require("express").Router();
const { login, register } = require("../controller/userC");
const { validateBody } = require("../utils/validator");
const { RegisterSchema } = require("../utils/schema");

router.post("/", login);
router.post("/register", validateBody(RegisterSchema), register);

module.exports = router;
