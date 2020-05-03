const express = require("express");
var controller = require("../controllers/books.controller");

const router = express.Router();

router.get("/", controller.index);

router.get("/:id/delete", controller.delete);

router.get("/:id/update", controller.update);

router.post("/update", controller.postUpdate);

router.post("/", controller.postIndex);

module.exports = router;