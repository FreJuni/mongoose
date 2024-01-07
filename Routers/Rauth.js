const express = require("express");
const postController = require("../Controllers/CAuth");

const router = express.Router();

router.get("/login", postController.loginPage);

router.post("/login", postController.loginData);

router.get("/register", postController.registerPage);

router.post("/register", postController.registerData);

router.post("/logout", postController.logoutAccount);

module.exports = router;
