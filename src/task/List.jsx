import React, { useState } from 'react'
import style from '../css/index.css'

export default function List() {

const [task, SetTask] = useState(["Comer","sacara a caminar"]);
const [newTask, setNewTask] = useState('');

const handleInput = (e) =>{

    setNewTask(e.target.value)
    console.log(newTask);

}

const addTask = ()=>{

    if(newTask.trim() !== ""){ 
        SetTask( t=> [...t, newTask]);
        setNewTask("");
    }
    alert("debe de ingresar dato");
    console.log("debe de ingresar dato");

}

const deleteTask = (index) => {

    const updateTask = task.filter((_, i) => i !== index);
    SetTask(updateTask);

}

const moveTaskUp = (index)=>{
    if(index > 0){
        const updateTastk = [...task];
        [updateTastk[index], updateTastk[index - 1]] = 
        [updateTastk[index - 1], updateTastk[index]];
        SetTask(updateTastk);
    }

}

const moveTaskDown = (index)=>{
    if(index < task.length - 1 ){
        const updateTastk = [...task];
        [updateTastk[index], updateTastk[index + 1]] = 
        [updateTastk[index + 1], updateTastk[index]];
        SetTask(updateTastk);
    }

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
            {task.map((task, index) =>
                <li key={index}>
                    <span className='texto'>{task}</span>
                    <button
                    className='eliminar-button'
                    onClick={() => deleteTask(index)}>Eliminar</button>
                    <button className='subirTarea'
                    onClick={() => moveTaskUp(index)}>subir</button>
                    <button className='bajarTarea'
                    onClick={() => moveTaskDown(index)}>bajar</button>
                </li>

            )}
        </ol>



    </div>
  )
}
