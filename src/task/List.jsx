import React, { useState, useEffect } from 'react'
import style from '../css/index.css'
import axios from 'axios';

export default function List() {

    const [task, SetTask] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [id, setId] = useState("");

    const URL = 'http://localhost:9000/notaslistas/v1/notas';


    useEffect(() => {
        axios.get(URL)
            .then(response => {
                console.log(response.data);
                SetTask(response.data);
            })
            .catch(error => {
                console.log("error en la peticion", error);
            });
    }, []);


    const handleInput = (e) => {
        e.preventDefault();
        setNewTask(e.target.value)
        
    };

    const addTask = async () => {

        if (newTask.trim() !== "") {

            const data = {
                notas: newTask,
            }

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
                SetTask(t => [...t, result]);
                setNewTask("");
                console.log("la peticion fue un exito ", result);
            } catch (error) {
                console.log("error en la peticion")
            }
        } else {
            console.log("la nota esta vacia")
        }
    };

    const deleteTask = async (index, id_listado) => {

        if (!id_listado) {
            console.error("Error: El id_listado de la tarea es undefined");
            return;
        }

        try {
            const response = await fetch(`${URL}/${id_listado}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            console.log("Se ha borrado:", id_listado);
            const updatedTasks = task.filter((_, i) => i !== index);
            SetTask(updatedTasks);
        } catch (error) {
            console.error("Error al eliminar la nota:", error);
        }
    };

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
                <button className='agregar' onClick={addTask}>Agregar</button>
            </div>

            <ol>
                {task.map((item, index) =>
                    <li key={item.id_listado}>
                        <span className='texto'>{item.notas}</span>
                        <button
                            className='eliminar-button'
                            onClick={() => deleteTask(index, item.id_listado)}>Eliminar</button>
                        <button className='subirTarea' onClick={() => moveTaskUp(index)}>subir</button>
                        <button className='bajarTarea' onClick={() => moveTaskDown(index)}>bajar</button>
                    </li>
                )}
            </ol>
        </div>
    )
}
