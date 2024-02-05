import React from 'react'

const Status = ({ status }) => {

    let statusClass = '';
    switch (status) {
        case 'inProgress':
            statusClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            break;
        case 'pending':
            statusClass = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
            break;
        default:
            statusClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            break;
    }

    return (
        <div>
            <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${statusClass}`}>
                {status}
            </span>
        </div>
    )
}

export default Status