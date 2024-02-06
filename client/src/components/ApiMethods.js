export const API_URL = 'http://localhost:8000/api/task';
import axios from "axios";

// ---------------GET Request-------------------------------------

//  get all Tasks
const getTasks = async () => {
  try {
    const response = await axios(`${API_URL}/tasks`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }

  // axios(`${API_URL}/tasks`)
  //   .then(response => setTasks(response.tasks))
  //   .catch(error => {
  //     console.error("Error fetching data: ", error)
  //   })
}


const deleteTaskById = async (taskId) => {
  try {
    await axios.delete(`${API_URL}/task/${taskId}`);
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    return updatedTasks;
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};



export {
    getTasks,
    deleteTaskById
  };