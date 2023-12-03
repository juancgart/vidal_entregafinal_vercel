import React, { useEffect, useState } from 'react'
import './App.css'
import { TaskForm, TaskList } from './components'

// llave para el local storage
const LOCAL_STORAGE_KEY = "react-task-list-tasks"

function App() {

  // use state estado inicial de las tareas, seteo de tareas
  const [tasks, setTasks] = useState([])
  // use state estado de las tarea, seteo de la tarea current
  const [currentTasks, setCurrentTasks] = useState([])
  // use state estado inicial del search con comillas vacias
  const [searchString, setSearchString] = useState('')

  const addTask = (task) =>{
    setTasks([...tasks, task])
  }

  const deleteTask = (taskId) =>{
    setTasks(tasks.filter(task => task.id != taskId))
  }

  const handleChangeFilter = (e) =>{
    setSearchString(e.target.value)
  }
  
  //hook useEffect para parsear el localStorage
  useEffect(() =>{

    const storageTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (storageTasks) {

        setTasks(storageTasks)

      }

  }, [])

//hook useEffect para el searching y el localStorage
  useEffect(() =>{

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));

    setCurrentTasks(tasks.filter(task => 
      task.title.toLowerCase().includes(searchString.toLowerCase())
      ||
      task.description.toLowerCase().includes(searchString.toLowerCase())
      ))
  }, [searchString, tasks])
  
  return (
    <>
      <div className='controls'>
        <input type="text" placeholder='Escribe para buscar...' value={searchString} onChange={handleChangeFilter} />
      
        <TaskForm addTask={addTask}/>
      </div>
      <TaskList tasks={currentTasks} deleteTask={deleteTask}/>
    </>
  )
}

export default App
