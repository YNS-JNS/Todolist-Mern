import { useState } from 'react'
import ButtonDelete from './ButtonDelete'
import GetMemo from './GetMemo';
import Priority from './Priority';
import Status from './Status';
import ButtonUpdate from './ButtonUpdate';
import TaskDetails from './TaskDetails';

const TaskCard = ({ task, handleDeleteTask, handleUpdateTask }) => {

    // State pour afficher ou masquer le popup
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupDetail, setShowPopupDetail] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null)

    // Check if the task object exists before trying to access its properties
    if (!task || Object.keys(task).length === 0) {
        // if (!task) {
        return null; // Return null if task is undefined or empty
    }

    // Destructure properties from the task object
    const { id, title, priority, status, description, deadline, createdAt } = task;

    /* ________________________________________________ */

    // Fonction pour afficher le popup lors du double-clic
    const handleDoubleClick = () => {
        setShowPopupDetail(true);
        setSelectedTask(task); // Get task selected
    }

    /* ________________________________________________ */

    // Fonction pour afficher le popup lors du double-clic
    const handleShowPopup = () => {
        setShowPopup(true);
        setSelectedTask(task); // Get task selected
    }
    /* ________________________________________________ */

    // Fonction pour masquer le popup
    const handleClosePopup = () => {
        setShowPopup(false);
        setShowPopupDetail(false);

    }

    /* ________________________________________________ */

    //  extraire uniquement la date sous forme de chaîne "04/02/2024" 

    const formattedDeadline = new Date(deadline).toLocaleDateString('en-GB');
    const formattedCreatedAt = new Date(createdAt).toLocaleDateString('en-GB');

    // console.log(formattedDeadline); // Output example: "04/02/2024"

    /* ________________________________________________ */


    return (
        // hover:bg-gray-400 
        <>
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-900 cursor-pointer drop-shadow-2xl h-70"
            onDoubleClick={handleDoubleClick}
            >
                <Priority priority={priority} />
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:pointer">
                    {title}
                </h5>
                <hr />
                <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 h-24 truncate">
                    {description}
                </p>

                <div className="flex justify-between">
                    <Status status={status} />

                    <span className="bg-red-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        Deadline : {formattedDeadline}
                    </span>
                </div>

                <div className='mt-4 flex justify-between'>
                    {/* Button for delete  */}
                    <ButtonDelete idTask={id} handleDeleteTask={handleDeleteTask} />
                    <ButtonUpdate handleShowPopup={handleShowPopup} />
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
                        title="created at"
                    >
                        <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                        </svg>
                        {formattedCreatedAt}
                    </span>

                </div>
            </div>

            {/* Condition pour afficher le popup */}
            {showPopup && <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white rounded shadow-lg p-4">
                    {/* Contenu du popup */}
                    <GetMemo
                        task={selectedTask} // Pass the selected task to the GetMemo component
                        handleUpdateTask={handleUpdateTask} // Pass the handleUpdateTask function
                    />
                    <button className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-900"
                        onClick={handleClosePopup}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>}

             {/* Condition pour afficher le popup detail */}
             {showPopupDetail && <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
                {/* <div className="bg-slate-700 rounded shadow-lg p-4"> */}
                    {/* Contenu du popup detail task */}
                    <TaskDetails
                        task={selectedTask} // Pass the selected task to the GetMemo component
                        // handleUpdateTask={handleUpdateTask} // Pass the handleUpdateTask function
                    />
                    <button className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-900"
                        onClick={handleClosePopup}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                {/* </div> */}
            </div>}

        </>
    )
}

export default TaskCard