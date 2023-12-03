import React from 'react'
import './TaskItem.css'
const TaskItem = ({task, deleteTask}) => {
    return (
        
        <div className='item-background'>
        
            <div className='item'>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span>{task.createAt}</span>
            <button onClick={() => deleteTask(task.id)}>Finalizar</button>
            <hr />
            </div>

        </div>
    )
}

export default TaskItem
