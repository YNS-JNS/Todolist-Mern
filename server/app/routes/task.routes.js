const express = require("express");
const taskController = require("../controllers/task.controller");
const router = express.Router();


router.post("/new", taskController.createTask);
router.get("/tasks", taskController.getTasks);
router.get("/:id", taskController.getTask);
router.patch("/update/:id", taskController.updateTask);
router.delete("/delete/:id", taskController.deleteTask);


// Exporting router
module.exports = router;