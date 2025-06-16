import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	//Declarar estados
	const [newTask, setNewTask] = useState("")
	const [tasks, setTasks] = useState([])
	const [taskCounter, setTaskCounter] = useState(0)

	//Funciones para manejar estados

	function addTask(event) {

		if (event.key === "Enter") {
			//agregar tarea a la lista de tareas

			setTasks(tasks.concat(newTask))
			setNewTask("");

		}
		//event.preventDefault()

	}
	console.log(tasks);







	return (
		<div className="text-center">
			{/* Titulo todos */}
			<h3 className="text-center mt-5 text-dark">todos</h3>

			{/* contenedor central */}
			<div className="container">

				{/* Input */}
				<input type="text" placeholder="texto aqui" value={newTask} onChange={(event) => setNewTask(event.target.value)} onKeyDown={addTask} />

				{/* Lista */}

				<ul>
					{tasks.map((task, index) => <li key={index}>{task}</li>)}
				</ul>



				{/* Contador de elementos en la lista */}
				<p>
					Elementos en la lista
				</p>
			</div>
		</div>
	);
};

export default Home;