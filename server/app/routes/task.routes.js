const express = require("express");
const taskController = require("../controllers/task.controller");
const router = express.Router();

router.post("/new", taskController.createTask);
router.get("/tasks-all", taskController.getTasks);
router.get("/:id", taskController.getTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);


// Exporting router:
module.exports = router;