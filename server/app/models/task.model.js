const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const TaskSchema = Schema(
    {

        task: {
            type: String,
            required: [true, 'Task text is required!'],
            trim: true,
            minlength: [1, 'Too short task text!'],
            maxlength: [500, 'Too long task text!'],
        },
        done: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

TaskSchema.method("toJSON", function () {
    
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;

    return object;
})

module.exports = mongoose.model("TaskModel", TaskSchema);