import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	//Declarar estados
	const [newTask, setNewTask] = useState("")
	const [tasks, setTasks] = useState([])
	/* const [taskRemover, setTaskRemover] = useState(0) */

	//Funciones para manejar estados

	function addTask(event) {

		if (event.key === "Enter") {
			//agregar tarea a la lista de tareas

			setTasks(tasks.concat(newTask));
			setNewTask("");


		}
		//event.preventDefault()

	}

	function removeTask(id) {
		/* alert("Funciona"+id) */
		setTasks(tasks.filter((_, index) => index !== id))
	}


	return (
		<div className="text-center">
			{/* Titulo todos */}
			<h3 className="text-center mt-5 text-dark">todos</h3>

			{/* contenedor central */}
			<div className="container">

				{/* Input */}
				<div className="row">
					<div className="col-3"></div>
					<input className="col-6"
						type="text"
						placeholder="texto aqui"
						value={newTask}
						onChange={(event) => setNewTask(event.target.value)}
						onKeyDown={addTask} />
					<div className="col-3"></div>
				</div>

				{/* Lista */}

				<div className="row">
					<div className="col-3"></div>
					<ul className="col-6 list-group">
						{/* Añadir que al hacer hover sobre el li, aparezca el botón de "eliminar" */}
						{tasks.map((task, index) =>
							<li key={index} className="list-group-item d-flex align-items-center border border-2 py-1 my-1">
								<span>{task}</span>

								<div className="ms-auto d-flex gap-2">
									<button className="btn btn-sm btn-danger" onClick={() => removeTask(index)}>X</button>
								</div>
							</li>
						)}

					</ul></div>
				<div className="col-3"></div>




				{/* Contador de elementos en la lista */}
				<p>
					{`${tasks.length} items left`}
				</p>
			</div>
		</div>
	);
};

export default Home;