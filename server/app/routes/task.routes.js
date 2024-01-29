const express = require("express");
const taskController = require("../controllers/task.controller");

const router = express.Router();

// Testing:
router.get("/", taskController.getTest);

// Exporting router:
module.exports = router;