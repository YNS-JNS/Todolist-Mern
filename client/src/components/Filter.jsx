import { useState } from 'react';

const Filter = ({ filteringTasks }) => {
    const [status, setStatus] = useState(''); // Initialize status state with empty string
    const [priority, setPriority] = useState(''); // Initialize priority state with empty string

    // Define a function to map status to color and icon
    const getStatusInfo = (status) => {
        switch (status) {
            case 'inProgress':
                return { color: 'blue', icon: '⚙️' }; // Change icon as needed
            case 'completed':
                return { color: 'green', icon: '✅' }; // Change icon as needed
            case 'pending':
            default:
                return { color: 'red', icon: '🕒' }; // Change icon as needed
        }
    };

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

    const handleFiltering = () => {
        // Check if both status and priority are selected
        if (status !== '' || priority !== '') {
            filteringTasks(status, priority);
        }
    };

    return (
        <div className='grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2'>
            <div className="md:col-span-1 px-4">
                <label htmlFor="priority" className='text-white'>Priority</label>
                <select
                    name="priority"
                    id="priority"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="important">{getPriorityInfo('important').icon} Important</option>
                    <option value="not-important">{getPriorityInfo('not-important').icon} Not Important</option>
                </select>
            </div>

            <div className="md:col-span-1">
                <label htmlFor="status" className='text-white'>Status</label>
                <select
                    name="status"
                    id="status"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="inProgress">{getStatusInfo('inProgress').icon} In Progress</option>
                    <option value="completed">{getStatusInfo('completed').icon} Completed</option>
                    <option value="pending">{getStatusInfo('pending').icon} Pending</option>
                </select>
            </div>

            <div className="md:col-span-2 px-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleFiltering}
                >
                    Filter
                </button>
            </div>
        </div>
    );
}

export default Filter;