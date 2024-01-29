const db = require("../models");

// const TaskModel = db.tasks;

exports.getTest = (req, res) => {
    res.json({ data: "Data from Server!! Test!!" });
};