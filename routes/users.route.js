const express = require("express");
const multer = require('multer');

const controller = require("../controllers/users.controller");
const validate = require('../validate/user.validate');

const router = express.Router();

const upload = multer({ dest: 'public/uploads/'});

router.get("/", controller.index);

router.get("/:id/delete", controller.delete);

router.get("/:id/update", controller.update);

router.get("/add-user", controller.addUser);

router.post("/update", controller.postUpdate);

router.post("/add-user", upload.single('avatar'), validate.postAddUser, controller.postAddUser);

module.exports = router;