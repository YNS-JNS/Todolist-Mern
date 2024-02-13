import React, { useState } from 'react';

const StatusDrop = () => {
    const [status, setStatus] = useState('pending'); // Define status state

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

    return (
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                {/* Rest of the content */}
                <div className="md:col-span-2">
                    <label htmlFor="status">Status</label>
                    <select name="status" id="status" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="in-progress">{getStatusInfo('in-progress').icon} In Progress</option>
                        <option value="completed">{getStatusInfo('completed').icon} Completed</option>
                        <option value="pending">{getStatusInfo('pending').icon} Pending</option>
                    </select>
                </div>
                {/* Rest of the form */}
            </div>
        </div>
    );
}

export default StatusDrop;
