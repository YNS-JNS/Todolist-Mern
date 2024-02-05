import { useState } from 'react'
import Priority from './Priority';
import Status from './Status';

const TaskDetails = ({ task }) => {

    // Check if the task object exists before trying to access its properties
    if (!task || Object.keys(task).length === 0) {
        // if (!task) {
        return null; // Return null if task is undefined or empty
    }

    /* ________________________________________________ */

    // Destructure properties from the task object
    const { title, priority, status, description, deadline, createdAt } = task;

    /* ________________________________________________ */

    // Extract the date part from the ISO string
    // const deadlineDate = new Date(deadline).toISOString().split('T')[0];
    const formattedDeadline = new Date(deadline).toLocaleDateString('en-GB');
    const formattedCreatedAt = new Date(createdAt).toLocaleDateString('en-GB');


    return (

        <div className="w-2/4 h-3/5 max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-900 cursor-pointer drop-shadow-2xl h-70"
        >
            <Priority priority={priority} />
            <h5 className="mb-2 mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:pointer">
                {title}
            </h5>
            <hr />
            <p className="mb-2 pt-6 font-normal text-gray-700 dark:text-gray-400 h-24 truncate">
                {description}
            </p>

            <div className="flex justify-between pt-6 pb-6">
                <Status status={status} />

                <span className="bg-red-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    {/* Deadline : {deadlineDate} */}
                    Deadline : {formattedDeadline}
                </span>
            </div>

            <div className='mt-4 text-end'>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
                    title="created at"
                >
                    <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                    </svg>
                    Created at : {formattedCreatedAt}
                </span>

            </div>
        </div>
    )
}

export default TaskDetails;