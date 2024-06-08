import React, { useState } from 'react'

export default function List() {

const [task, SetTask] = useState(["Comer","sacara a caminar"]);
const [newTask, setNewTask] = useState('');

const handleInput = (e) =>{

    setNewTask(e.target.value)
    console.log(newTask);

}

const addTask = ()=>{

}

const deleteTask = (index) => {

}

const moveTaskUp = (index)=>{

}

const moveTaskDown = (index)=>{

}


  return (
    <div className='lista'>
        <h1>Listado</h1>
        <div>
            <input type="text" 
            placeholder='ingresa la tarea que deses'
            value={newTask}
            onChange={handleInput}
            />
            <button className='agregar'
            onClick={addTask}>Agregar</button>
        </div>

        <ol>
            {task.map((tasks, index) =>
                <li key={index}>
                    <span className='texto'>{task}</span>
                    <button
                    className='eliminar-button'
                    onClick={() => deleteTask(index)}>Eliminr</button>
                    <button className='subirTarea'
                    onClick={() => moveTaskUp(index)}>subir</button>
                    <button className='bajarTarea'
                    onClick={() => moveTaskDown(index)}>subir</button>
                </li>

            )}
        </ol>



    </div>
  )
}
