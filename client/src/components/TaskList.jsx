
import Task from './Task';

const TaskList = ({ tasks, onToggle, onDelete}) => {

  return (
    <div className='content-center w-9/12'>
      {tasks.map((task, i) => (
        <Task 
          key={i} 
          task={task} 
          onDelete={onDelete} 
          onToggle={onToggle} 
        />
      ))}
    </div>
  );
};

export default TaskList;
