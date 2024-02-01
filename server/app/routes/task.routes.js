const express = require("express");
const {
    idValidator,
    createTaskValidator,
    updateTaskValidator
} = require("../middlewares/validations/taskValidator");
const taskController = require("../controllers/task.controller");
const router = express.Router();

/**
 * @desc Create a new task
*/
router.post("/new", createTaskValidator, taskController.createTask);

/**
 * @desc fetch tasks
*/
router.get("/", taskController.getTasks);

/**
 * @desc Get done tasks
*/
router.get("/done", taskController.getDoneTask);

/**
 * @desc fetch task by ID
*/
router.get("/:id", idValidator, taskController.getTask);

/**
 * @desc Update task by ID
*/
router.patch("/update/:id", idValidator, updateTaskValidator, taskController.updateTask);

/**
 * @desc Delete task by ID
*/
router.delete("/delete/:id", idValidator, taskController.deleteTask);


// Exporting router
module.exports = router;