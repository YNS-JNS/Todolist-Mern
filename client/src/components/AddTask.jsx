import React, { useState } from 'react';


const AddTask = ({ onAddTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');

// ----------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(newTaskTitle);

    setNewTaskTitle('');
  };

  return ( 
    <form onSubmit={handleSubmit} className="mt-9 mb-7">
      <div className="flex flex-wrap justify-center xl:w-1/2 ">
        <input 
          type="text" 
          value={newTaskTitle} 
          onChange={(e) => setNewTaskTitle(e.target.value)} 
          className="h-14 mb-3 bg-gray-200 text-gray-700 text-2xl rounded bg-opacity-20 border border-gray-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
        />
        <button 
          type="submit"
          className="h-12 xl:w-1/3 inline-flex items-center font-bold text-gray-600 bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base ml-4">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default AddTask;
