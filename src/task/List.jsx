import React, { useState } from 'react'
import style from '../css/index.css'

export default function List(onSubmitCallback) {

    const [task, SetTask] = useState(["Comer", "sacara a caminar"]);
    const [newTask, setNewTask] = useState('');
    const [id, setId] = useState("");



    const handleInput = (e) => {
        e.preventDefault();
        setNewTask(e.target.value)
        console.log(newTask);

    }

    const addTask = async () => {

        if (newTask.trim() !== "") {

            const data = {
                id_listado: id,
                notas: newTask,
            }

            const URL = 'http://localhost:9000/notaslistas/v1/notas';
            try {
                const response = await fetch(URL, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const result = await response.json();
                SetTask(t => [...t, newTask]);
                setNewTask("");
                console.log("la peticion fue un exito ", result);


            } catch (error) {
                console.log("first")
            }

        }else{
            console.log("la nota esta vacia")
        }


    }

    const deleteTask = (index) => {

        const updateTask = task.filter((_, i) => i !== index);
        SetTask(updateTask);

    }

    const moveTaskUp = (index) => {
        if (index > 0) {
            const updateTastk = [...task];
            [updateTastk[index], updateTastk[index - 1]] =
                [updateTastk[index - 1], updateTastk[index]];
            SetTask(updateTastk);
        }

    }

    const moveTaskDown = (index) => {
        if (index < task.length - 1) {
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
                        <p>{id}</p>
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
