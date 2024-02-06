// import React, {useEffect, useState} from 'react';
import { API_URL } from './ApiMethods';


const Task = ({ task, onDelete, onToggle }) => {

  return (
    <div className="flex justify-between flex-wrap mb-3 px-4 py-3 border rounded shadow">
      <div className="flex justify-start">
        <div className="mr-4">        
          <input
            type='checkbox'
            checked={task.done}
            onChange={() => onToggle(task.id)}
            className='cursor-pointer h-8 w-8'
          />
        </div>

        <h5 className="text-gray-600 text-lg font-bold min-w-48 text-start">
          {task.title}
        </h5>
        
      </div>
      
      <div className='flex flex-nowrap mt-1 sm:mt-0'>
        <button 
          className="h-10 items-center font-bold text-white bg-green-400 border-0 py-1 px-3 focus:outline-none hover:bg-green-300 rounded text-base md:mt-0"
          type="submit" 
          // onClick={() => onEdit(task.id)} 
          >
          Edit
        </button>

        <button 
          className="ml-2 h-10 items-center font-bold text-white bg-red-400 border-0 py-1 px-3 focus:outline-none hover:bg-red-300 rounded text-base md:mt-0"
          type="submit" 
          onClick={onDelete} >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
