import { useEffect, useState } from 'react';

const GetMemo = ({ task, handleUpdateTask }) => {

    // Extract the date part from the ISO string
    const deadlineDate = new Date(task.deadline).toISOString().split('T')[0];

    const [formData, setFormData] = useState({
        title: task ? task.title : '',
        priority: task ? task.priority : 'important',
        status: task ? task.status : 'pending',
        description: task ? task.description : '',
        createdBy: task ? task.createdBy : '',
        deadline: deadlineDate
    });

    /* ________________________________________________ */

    useEffect(() => {
        if (task) {

            const deadlineDate = new Date(task.deadline).toISOString().split('T')[0];

            setFormData({
                title: task.title,
                priority: task.priority,
                status: task.status,
                description: task.description,
                createdBy: task.createdBy,
                deadline: deadlineDate, // Update the deadline field value
            });
        }
    }, [task]);

    /* ________________________________________________ */

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /* ________________________________________________ */

    const handleSubmit = (e) => {
        e.preventDefault();

        // Pass task.id and formData to handleUpdateTask function
        handleUpdateTask(task.id, formData);
        // handleClosePopup();
    };

    /* ________________________________________________ */

    // Define a function to map status to color and icon
    const getStatusInfo = (status) => {
        switch (status) {
            case 'in-progress':
                return { color: 'blue', icon: '⚙️' }; // Change icon as needed
            case 'completed':
                return { color: 'green', icon: '✅' }; // Change icon as needed
            case 'pending':
            default:
                return { color: 'red', icon: '🕒' }; // Change icon as needed
        }
    };

    /* ________________________________________________ */


    // Define a function to map priority to color and icon
    const getPriorityInfo = (priority) => {
        switch (priority) {
            case 'important':
                return { color: 'red', icon: '🔴' }; // Change icon as needed
            case 'not-important':
            default:
                return { color: 'gray', icon: '⚪' }; // Change icon as needed
        }
    };

    /* ________________________________________________ */

    return (
        <div className='drop-shadow-2xl' >
            <div className="bg-slate-800 rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div className="text-gray-300">
                        <p className="font-medium text-lg">Memo Tracker</p>
                        <p>Please fill out all the fields.</p>
                    </div>

                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label htmlFor="title" className='text-white' >Title</label>
                                    <input type="text" name="title" id="title" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        placeholder='Enter your title here...'
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="md:col-span-1">
                                    <label htmlFor="priority" className='text-white'>Priority</label>
                                    <select name="priority" id="priority" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        value={formData.priority}
                                        onChange={handleChange}
                                    >
                                        <option value="important">{getPriorityInfo('important').icon} Important</option>
                                        <option value="not-important">{getPriorityInfo('not-important').icon} Not Important</option>
                                    </select>
                                </div>

                                <div className="md:col-span-1">
                                    <label htmlFor="status" className='text-white'>Status</label>
                                    <select name="status" id="status" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="in-progress">{getStatusInfo('in-progress').icon} In Progress</option>
                                        <option value="completed">{getStatusInfo('completed').icon} Completed</option>
                                        <option value="pending">{getStatusInfo('pending').icon} Pending</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="description" className='text-white' >Description</label>
                                    <textarea name="description" id="description" className="h-20 border mt-1 rounded px-4 py-2 w-full bg-gray-50" placeholder='Enter your details here...'
                                        value={formData.description}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div className="md:col-span-1">
                                    <label htmlFor="created_by" className='text-white' >Created By</label>
                                    <input type="text" name="createdBy" id="createdBy" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder='Mohamed example'
                                        value={formData.createdBy}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="md:col-span-1">
                                    <label htmlFor="deadline" className='text-white' >Deadline</label>
                                    <input type="date" name="deadline" id="deadline" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        value={formData.deadline}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="md:col-span-2 text-right">
                                    <div className="inline-flex items-end">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            type='submit'
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetMemo;
