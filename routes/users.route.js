const express = require("express");
var controller = require("../controllers/users.controller");
var validate= require('../validate/user.validate');

const router = express.Router();

router.get("/", controller.index);

router.get("/:id/delete", controller.delete);

router.get("/:id/update", controller.update);

router.get("/add-user", controller.addUser);

router.post("/update", controller.postUpdate);

router.post("/add-user",validate.postAddUser, controller.postAddUser);

module.exports = router;