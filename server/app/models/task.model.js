const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const TaskSchema = Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required!'],
            trim: true,
            minlength: [2, 'Title is too short!'],
            maxlength: [40, 'Title is too long!'],
        },
        priority: {
            type: String,
            enum: ['important', 'not-important'],
            default: 'not important'
        },
        status: {
            type: String,
            enum: ['inProgress', 'pending', 'completed'],
            default: 'pending'
        },
        description: {
            type: String,
            required: [true, 'Description is required!'],
            trim: true,
            minlength: [2, 'Description is too short!'],
            maxlength: [400, 'Description is too long!'],
        },
        removedAt: {
            type: Date,
            default: null
        },
        createdBy: {
            // type: Schema.Types.ObjectId,
            // ref: 'User',
            type: String,
            default: null
            // required: true
        },
        deadline: {
            type: Date
        },
        // done: {
        //     type: Boolean,
        //     default: false
        // }
    },
    { timestamps: true }
);

TaskSchema.method("toJSON", function () {

    const { __v, _id, ...object } = this.toObject();
    object.id = _id;

    return object;
})

module.exports = mongoose.model("TaskModel", TaskSchema);