import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTasks } from '../features/task/taskSlice'

const Tasks = () => {

    const dispatch = useDispatch();
    const { loading, tasks } = useSelector(state => state.task);

    useEffect(() => {
        // Call the callback function
        dispatch(getTasks());
    }, []);

    console.log(tasks);

    return (
        <div>
            <h1> Tasks lists: </h1>
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <ul>
                        {/* <p>Test</p> */}
                        {
                            tasks.data.map((task, index) => (
                                <li key={index}> {task.task} </li>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default Tasks