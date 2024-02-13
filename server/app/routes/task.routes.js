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
router.post("/", createTaskValidator, taskController.createTask);

/**
 * @desc fetch tasks
*/
router.get("/", taskController.getTasks);

/**
 * @desc Get done tasks
*/
// router.get("/done", taskController.getDoneTask);

/**
 * @desc Get completed tasks
*/
router.get("/done", taskController.getCompletedTasks);

/**
 * @desc fetch task by ID
*/
router.get("/:id", idValidator, taskController.getTask);

/**
 * @desc Update task by ID
*/
router.patch("/:id", idValidator, updateTaskValidator, taskController.updateTask);

/**
 * @desc Delete task by ID
*/
router.delete("/:id", idValidator, taskController.deleteTask);

/**
 * @desc Delete all tasks
*/
router.delete("/", idValidator, taskController.deleteAllTasks);


// Exporting router
module.exports = router;