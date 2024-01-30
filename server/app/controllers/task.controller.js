const db = require("../models");

const Tasks = db.tasks;


// -------  POST Request : Create a new task ------- //
exports.createTask = async (req, res) => {
  try {
    const newTask = new Tasks(req.body);
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
    // Find and sort todos with creating time
    const tasks = await Tasks.find({}).sort({ createdAt: -1 });
    
    if (!tasks) {
      return res.status(500).json({ error: error.message });
    } else {
      // res.send(tasks);
      res.status(200).json({
        tasks: tasks
      });
    }

  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
};
// -------------------------------------------- //


// -------  GET Request : Get a task ------- //
exports.getTask = async (req, res) => {
    try {
      const { id: taskId } = req.params;
      const task = await Tasks.findOne({ _id: taskId });
  
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
      const task = await Tasks.findByIdAndUpdate(taskId, req.body, { new: true, runValidators: true });

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
      const task = await Tasks.findByIdAndDelete(taskId);
  
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
