const express = require("express");
const router = express.Router();
const { signUp, login, chatPost, chatGet } = require("../controller/user.controller.js");
const { auth } = require("../../../middleware/auth.js");

router.post("/sign_up", signUp);
router.post("/login", login);
router.post("/chat", auth, chatPost);
router.get("/chat", auth, chatGet)
module.exports = router;
