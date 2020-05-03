const express = require("express");
var controller = require("../controllers/transactions.controller");

const router = express.Router();

router.get("/", controller.index);

router.get("/:id/delete", controller.delete);

router.get("/create", controller.create);

router.post("/create", controller.postCreate);

module.exports = router;