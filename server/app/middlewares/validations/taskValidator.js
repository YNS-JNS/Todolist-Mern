const Joi = require("joi");

/* ____________________________________________________________________ */
/*                     Validation ID (_id is valid)                     */
/* ____________________________________________________________________ */

// Todo: Check if Id of Task is valid or not:
const checkingId = (id) => {

    const idSchema = Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$'));

    return idSchema.validate(id);
};

// * Custom middleware
// Todo: Checking id of task : is valid
exports.idValidator = (req, res, next) => {

    const { error: idError } = checkingId(req.params.id)

    if (idError) {

        console.log(idError.details[0].message);

        return res.status(400).json(
            {
                status: 400,
                message: `Task Id = ${req.params.id} is invalid !`
            }
        )
    }

    next();
};

/* ____________________________________________________________________ */
/*                      Validation Creating Task                        */
/* ____________________________________________________________________ */

// Todo: Validation for creating a new Task:
const createNewTask = (data) => {

    const taskSchema = Joi.object(
        {
            task: Joi.string().required().min(2).max(500),
            done: Joi.boolean()
        }
    );

    return taskSchema.validate(data);
};

exports.createTaskValidator = (req, res, next) => {

    const { error } = createNewTask(req.body);

    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message
        })
    }

    next();
};

/* ____________________________________________________________________ */
/*                      Validation Updating Task                        */
/* ____________________________________________________________________ */

// Todo: Validation Schema for updating a task:
const updateTask = (data) => {

    const updateTaskSchema = Joi.object(
        {
            task: Joi.string().min(2).max(500),
            done: Joi.boolean()
        }
    ).min(1); // * At least one field must be present

    return updateTaskSchema.validate(data);
};

exports.updateTaskValidator = (req, res, next) => {

    const { error: dataError } = updateTask(req.body, { abortEarly: false });
    /*
    By using { abortEarly: false } with validate, you'll get all validation errors at once, rather than stopping at the first error. 
    You can then map these errors to inform the user of each invalid field.
    This approach gives you the flexibility to manage more detailed error messages for each field. 
    You can customize the error message for each field in your JSON response. 
    */
    if (dataError) {

        const errorMessage = dataError.details.map(detail => detail.message);
        return res.status(400).json(
            {
                status: 400,
                message: errorMessage
            }
        )
    }

    next();
};