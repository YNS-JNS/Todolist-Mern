import React from 'react'

const Priority = ({ priority }) => {
    return (
        <div>
            {priority === 'important' ?
                (
                    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                        {priority}
                    </span>
                ) : (
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-900 dark:text-gray-300">
                        {priority}
                    </span>
                )}
        </div>
    )
}

export default Priority