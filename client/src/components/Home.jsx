import SearchBar from './SearchBar'
import TaskCard from './TaskCard'
import AddMemo from './AddMemo'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {

  /* ________________________________________________ */

  // Store the tasks
  const [tasks, setTasks] = useState([]);
  // Store the error messages
  // const [error, setError] = useState('');
  // const [message, setMessage] = useState('')
  /* ________________________________________________ */
  // Todo: Fetching tasks from the server
  const fetchTasks = async () => {
    try {

      const res = await axios.get("http://localhost:8000/api/tasks");
      return res.data;

    } catch (error) {
      console.log("Error getting tasks", error);
      // setError('An error occurred while fetching tasks.');
      return null;
    }
  }
  /* ________________________________________________ */

  /* ________________________________________________ */
  // Execute once on component mount
  useEffect(() => {

    const getData = async () => {
      const data = await fetchTasks();
      if (data) {
        setTasks(data.data); // Update to setTasks(data.data) to access the array inside data property
      }
    };

    getData();

  }, [])
  /* ________________________________________________ */

  /* ________________________________________________ */
  const handleAddTask = async (payload) => {

    try {

      const res = await axios.post("http://localhost:8000/api/tasks/", payload);
      const responseData = await res.data;

      if (responseData.status === 201 && responseData.data) {

        const newTask = responseData.data;

        setTasks([newTask, ...tasks]);
        console.log('New task created successfully', newTask);
      } else {
        console.log('Invalid response data:', responseData);
        // setError('An error occurred while adding the task. Please try again later.');
      }

    } catch (error) {
      console.log("Error adding task", error);
      // setError('Catch: An error occurred while adding the task. Please try again later.');
      // return null;
    }
  }

  /* ________________________________________________ */

  // Handle deleting task:
  const handleDeleteTask = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/tasks/${id}`);
      const response = await res.data;

      if (response.status === 200 && response.message) {
        setTasks(tasks.filter(task => task.id !== id)); // Filter out the task with matching ID
        // setMessage("Task successfully deleted");
      } else {
        console.log('Invalid response data:', response);
        // setError('An error occurred while deleting the task. Please try again later.');
      }
    } catch (error) {
      console.error("Error deleting task", error);
      // setError('An error occurred while deleting the task. Please try again later.');
    }
  }

  /* ________________________________________________ */

  // Handle updating a task
  const handleUpdateTask = async (id, payload) => {
    try {
      const res = await axios.patch(`http://localhost:8000/api/tasks/${id}`, payload);
      const responseData = await res.data;

      console.log('Response Data:', responseData); // Check the responseData structure

      if (responseData.status === 200 && responseData.data) {

        const updatedTask = responseData.data;
        setTasks(tasks.map(task =>
          (task.id === id ? updatedTask : task))
        );
        console.log('Task updated successfully', updatedTask);

      } else {
        console.log('Invalid response data:', responseData);
      }
    } catch (error) {
      console.log("Error updating task", error);
    }
  }

  /* ________________________________________________ */
  // Console section:
  console.log("All tasks: ", tasks)
  // console.log(tasks.data)
  /* ________________________________________________ */

  return (
    /* _____________________________ Containe _____________________________ */
    <div className='parent container mx-auto  bg-slate-700'>

      {/* ________________ Section Searching ________________ */}
      <div className='flex justify-center bg-slate-700 px-10 py-8'>
        <SearchBar />
      </div>

      {/*  ________________ Section Add Task ________________  */}
      <div className='bg-slate-700 px-10 py-8'>
        <AddMemo handleAddTask={handleAddTask} />
      </div>

      {/*  ________________ Section Card Task ________________  */}
      <div className='grid grid-cols-3 gap-3 px-10 py-8 pb-14'>
        {tasks && tasks.map((task, index) => {
          return (
            <TaskCard
              key={index}
              task={task}
              handleDeleteTask={handleDeleteTask}
              handleUpdateTask={handleUpdateTask}
            />
          )
        })}
      </div>

    </div>
  )
}

export default Home