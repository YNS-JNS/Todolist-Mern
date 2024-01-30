const db = require("../models");

const TaskModel = db.tasks;

// -------  POST Request : Create a new task ------- //
exports.createTask = async (req, res) => {
  
  try {
    // Create a new task instance
    const newTask = new TaskModel(req.body);

    // Save the task to the database
    const savedTask = await newTask.save();

    res.status(201).json({
      message: "Create a new task successfully."
    });

    return savedTask;

  } catch (error) {
    console.error('Error creating task:', error.message);
    throw error;
  }
};
// -------------------------------------------- //


// -------  GET Request : Get All tasks ------- //
exports.getTasks = async (req, res) => {
    try {
      const tasks = await TaskModel.find({}).sort({ createdAt: -1 });
      // const tasks = await TaskModel.find({})
  
      try {
        res.status(200).json({
          message: "Get all tasks successfully.",
          tasks: tasks,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
// -------------------------------------------- //


// -------  GET Request : Get a task ------- //
exports.getTask = async (req, res) => {
    try {
      const { id: taskId } = req.params;
      const task = await TaskModel.findOne({ _id: taskId });
  
      if (!task) {
        return res.status(404).json({ msg: `No task with id: ${taskId}` });
      } else {
        res.status(200).json({
          message: "Get a task successfully.",
          task: task,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
// -------------------------------------------- //
  

// -------  PUT Request : Update a task ------- //
exports.updateTask = async (req, res) => {
    try {
      const { id: taskId } = req.params;
      const task = await TaskModel.findByIdAndUpdate(taskId, req.body, { new: true, runValidators: true });

      console.log('Task to update: '+task);

      if (!task) {
        return res.status(404).json({ msg: `No task with id: ${taskId}` });
      } else {
        res.status(200).json({
          msg: `Task with id: ${taskId} updated successfully.`,
          task: task,
        });
      }

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
// -------------------------------------------- //


// -------  DELETE Request : Delete a task ------- //
exports.deleteTask = async (req, res) => {
    try {
      const { id: taskId } = req.params;
      const task = await TaskModel.findByIdAndDelete(taskId);
  
      if (!task) {
        return res.status(404).json({ msg: `No task with id: ${taskId}` });
      } else {
        res.status(200).json({
          message: `Task with id: ${taskId} deleted successfully.`,
          task: task,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
// -------------------------------------------- //
