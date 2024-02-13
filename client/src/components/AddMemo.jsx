import { useState } from 'react';

const AddMemo = ({ handleAddTask }) => {

    /* ________________________________________________ */

    // state to toggle form visibility:
    const [showForm, setShowForm] = useState(false);

    // Store error message
    const [error, setError] = useState('');

    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    // * State Object to store values:
    const [formData, setFormData] = useState({
        title: '',
        priority: 'important',
        status: 'pending',
        description: '',
        createdBy: '',
        deadline: currentDate
    });

    /* ________________________________________________ */

    // Function to handle changes in form fields
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    /* ________________________________________________ */

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description) {
            setError('Please enter a title and description before submitting form data.');
            return;
        }

        try {

            setError('');
            await handleAddTask(formData)
            // console.log('Data created successfully', formData);
            // Clear form fields after submission
            setFormData({
                title: '',
                priority: 'important',
                status: 'pending',
                description: '',
                createdBy: '',
                deadline: ''
            });

        } catch (error) {
            console.error("Error adding task", error);
            setError('An error occurred while adding the task. Please try again later.');
        }


    };

    /* ________________________________________________ */

    // Define status state:
    // const [status, setStatus] = useState('pending');

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

    // Define priority state:
    // const [priority, setPriority] = useState('important');

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

    // Toggle: show form for adding a task
    const toggleMemo = () => {
        setShowForm(!showForm);
    }
    /* ________________________________________________ */


    return (
        <div className='drop-shadow-2xl' >
            <div>
                <div className="md:col-span-5 text-right mb-4">
                    <div className="inline-flex items-end">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded drop-shadow-2xl"
                            onClick={toggleMemo}
                            title="Toggle memo"
                        >
                            {showForm ? 'Hide' : 'Add Task'}
                        </button>
                    </div>
                </div>
                {/* <Suspense fallback={<Loading />} > */}

                    {/* <div style={{ opacity: showForm ? 1 : 0, transition: 'opacity 0.5s' }} > */}
                    <div style={{ opacity: showForm ? 1 : 0, transition: 'opacity 1s ease-in-out' }} >
                        {error && <p className="text-red-500">{error}</p>}
                        {
                            showForm && (
                                <div className="bg-slate-800 rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                            <div className="text-gray-300">
                                                <p className="font-medium text-lg">Memo Tracker</p>
                                                <p>Please fill out all the fields.</p>
                                            </div>

                                            <div className="lg:col-span-2">
                                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                                                    <div className="md:col-span-2">
                                                        <label htmlFor="title" className='text-white' >
                                                            Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="title"
                                                            id="title" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                            placeholder='Enter your title here...'
                                                            value={formData.title}
                                                            onChange={handleChange}
                                                        />
                                                    </div>

                                                    <div className="md:col-span-1">
                                                        <label htmlFor="priority" className='text-white'>
                                                            Priority
                                                        </label>
                                                        <select name="priority" id="priority" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                            value={formData.priority}
                                                            onChange={handleChange}>
                                                            <option value="important">{getPriorityInfo('important').icon} Important</option>
                                                            <option value="not-important">{getPriorityInfo('not-important').icon} Not Important</option>
                                                        </select>
                                                    </div>

                                                    <div className="md:col-span-1">
                                                        <label htmlFor="status" className='text-white'>Status</label>
                                                        <select name="status" id="status" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                            value={formData.status}
                                                            onChange={handleChange}>
                                                            <option value="inProgress">{getStatusInfo('in-progress').icon} In Progress</option>
                                                            <option value="completed">{getStatusInfo('completed').icon} Completed</option>
                                                            <option value="pending">{getStatusInfo('pending').icon} Pending</option>
                                                        </select>
                                                    </div>

                                                    <div className="md:col-span-2">
                                                        <label htmlFor="description" className='text-white' >Description</label>
                                                        <textarea name="description" id="description"
                                                            className="h-20 border mt-1 rounded px-4 py-2 w-full bg-gray-50"
                                                            placeholder='Enter your details here...'
                                                            value={formData.description}
                                                            onChange={handleChange}
                                                        ></textarea>
                                                    </div>

                                                    <div className="md:col-span-1">
                                                        <label htmlFor="createdBy" className='text-white' >Created By</label>
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
                                                            >Save</button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )
                        }

                    </div>
                {/* </Suspense> */}

            </div>
        </div >
    );
}

export default AddMemo;

// function Loading() {
//     return <h2>🌀 Loading...</h2>;
// }