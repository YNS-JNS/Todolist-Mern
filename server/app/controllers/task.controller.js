const db = require("../models");
const Task = db.tasks;

/* ____________________________________________________________________ */

/**
 * Create a new task.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise representing the completion of the function.
*/

exports.createTask = async (req, res) => {
  try {

    // Create a new task instance with the data from the request body
    const newTask = new Task(req.body);

    // Save the new task to the database
    const savedTask = await newTask.save();

    // Return a success response with the saved task data
    res.status(201).json({
      status: 201,
      message: "Created a new task successfully.",
      data: savedTask
    });

    // return savedTask;

  } catch (error) {

    console.error("Error creating task:", error); // Log the error for debugging

    res.status(500).json({
      status_code: 500,
      message: "Some error occurred while creating the Task!",
      error: error.message
    })
  }
};

/* ____________________________________________________________________ */

/**
 * Retrieve all tasks.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise representing the completion of the function.
*/

exports.getTasks = async (req, res) => {
  try {

    // * Query: ---------------------------
    const { task } = req.query;

    const condition = {};

    // * Nb: $options: "i" makes the search case-insensitive.

    // * Filter by task
    if (task) {
      condition.task = { $regex: new RegExp(task), $options: "i" };
    }

    // ------------------------------------

    // * Find and sort tasks by creation time
    const tasks = await Task.find(condition).sort({ createdAt: -1 });
    // const Tasks = await Task.find({});

    if (!tasks) {
      return res.status(404).json({
        status: 404,
        message: "No tasks found !",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Successfully retrieved tasks .",
      totalItems: tasks.length,
      data: tasks,
    });

  } catch (error) {

    console.error("Error fetching tasks:", error);

    res.status(500).json({
      status: 500,
      message: "Some error occurred while fetching the tasks :(",
      error: error.message,
    })
  }
};

/* ____________________________________________________________________ */

/**
 * Retrieve a task by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise representing the completion of the function.
*/

exports.getTask = async (req, res) => {
  try {

    const taskId = req.params.id;

    // Check if the task ID is valid
    /*if (!mongoose.Types.ObjectId.isValid(taskId)) {
     return res.status(400).json({
       status: 400,
       message: "Invalid task ID.",
     });
   }*/

    // Retrieve the task from the database
    const task = await Task.findById(taskId);

    // Check if the task exists
    if (!task) {
      return res.status(404).json(
        {
          status: 404,
          message: `Task with ID ${taskId} not found..`,
        }
      );
    }

    // Return the task in the response
    return res.status(200).json({
      status: 200,
      message: "Successfully retrieved task.",
      data: task,
    });

  } catch (error) {
    console.error("Error retrieving task:", error);
    res.status(500).json({
      status: 500,
      message: "Error retrieving task.",
      error: error.message,
    })
  }
};

/* ____________________________________________________________________ */

/**
 * Update a task by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise representing the completion of the function.
*/

exports.updateTask = async (req, res) => {
  try {

    const taskId = req.params.id;

    // Update the task in the database
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true, runValidators: true });

    // Check if the task exists
    if (!updatedTask) {
      return res.status(404).json({
        status: 404,
        message: `Task with ID ${taskId} not found.`,
      });
    }

    // Return the updated task in the response
    return res.status(200).json({
      status: 200,
      message: "Successfully updated task .",
      data: updatedTask,
    });


  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      status: 500,
      message: "Some error occured while updating the task",
      error: error.message,
    });
  }
};

/* ____________________________________________________________________ */

/** 
 * Delete a task by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise representing the completion of the function.
*/

exports.deleteTask = async (req, res) => {
  try {

    const taskId = req.params.id;

    // Delete the task from the database
    const deletedTask = await Task.findByIdAndDelete(taskId);

    // Check if the task exists
    if (!deletedTask) {
      return res.status(404).json({
        status: 404,
        message: `Task with ID ${taskId} not found.`,
      });
    }

    // Return success message in the response
    return res.status(200).json({
      status: 200,
      message: `Task with ID ${taskId} was removed successfully.`,
    });

  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      status: 500,
      message: "Some error occured while removing the task",
      error: error.message,
    });
  }
};

/* ____________________________________________________________________ */

/** 
 * Retrieve tasks marked as done.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise representing the completion of the function.
*/

exports.getDoneTask = async (req, res) => {

  try {

    const doneTasks = await Task.find({ done: true });

    if (!doneTasks || doneTasks.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No tasks found !",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Successfully retrieved tasks .",
      totalItems: doneTasks.length,
      data: doneTasks,
    });

  } catch (error) {

    console.error("Error searching done tasks:", error);

    res.status(500).json({
      status: 500,
      message: "Some error occured while searching the tasks",
      error: error.message,
    });
  }
};

/* ____________________________________________________________________ */

/** 
 * Delete all tasks.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise representing the completion of the function.
*/

exports.deleteAllTasks= async (req, res) => {

  try {

   const deletedTasks = await Task.deleteMany({});

    return res.status(200).json({
      status: 200,
      message: `${deletedTasks.deletedCount} tasks were deleted successfully.`,
      totalItems: deletedTasks.deletedCount
    });

  } catch (error) {

    console.error("Error removing the tasks:", error);

    res.status(500).json({
      status: 500,
      message: "Some error occured while removing the tasks",
      error: error.message,
    });
  }
};

/* ____________________________________________________________________ */