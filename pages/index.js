import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import {auth_required} from '../middlewares/auth_required'
import { API_URL } from '../utils/constants'

export default function Home() {
  const { token } = useAuth()
 

  auth_required();
 

  function getTasks() {
    /***
     * @todo Fetch the tasks created by the user.
     * @todo Set the tasks state and display them in the using TodoListItem component
     * The user token can be accessed from the context using useAuth() from /context/auth.js
     */
    axios({
      headers : {Authorization : "Token " + token},
      url : API_URL + 'todo/',
      method : "get"
    }).then((res)=>{
      const {data,status} = res;
      setTasks(data);

    }).catch(error=>console.log(error))
  }

  const [tasks, setTasks] = useState([])

  const jsx =  tasks.map((task)=> (<TodoListItem key={task.id} {...task} />))

  useEffect(()=>{
    getTasks()
  },[tasks])

  

  return (
    <div >
      <center>
        <AddTask />
        <ul className=' flex-col mt-9 max-w-sm mb-3 '>
          <span className='inline-block bg-blue-600 dark:bg-green-800  py-1 mb-2 px-9 text-sm text-white font-bold rounded-full '>
            Available Tasks
          </span>
          {!tasks.length?<h1 className='dark:text-white text-gray-600 py-2'>No Todos</h1>:
           jsx} 
        </ul>
      </center>
    </div>
  )
}
