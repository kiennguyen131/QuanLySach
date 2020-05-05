const express = require("express");
var controller = require("../controllers/users.controller");

const router = express.Router();

router.get("/", controller.index);

router.get("/:id/delete", controller.delete);

router.get("/:id/update", controller.update);

router.get("/add-user", controller.addUser);

router.post("/update", controller.postUpdate);

router.post("/add-user", controller.postAddUser);

module.exports = router;