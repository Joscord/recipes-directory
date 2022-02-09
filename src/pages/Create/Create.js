import { useState } from 'react';
import './Create.css';

const Create = () => {
	// Crearemos 3 piezas de estado para almacenar la información introducida por el usuario. Estas piezas serán el título, el tiempo de cocción y el método. Los ingredientes los manejaremos después
	const [title, setTitle] = useState('');
	const [method, setMethod] = useState('');
	const [cookingTime, setcookingTime] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = e => {
    e.preventDefault();
  }

	return (
		<div className='create'>
			<h2 className='page-title'>Add a New Recipe</h2>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Recipe Title:</span>
					<input
						type='text'
						onChange={e => setTitle(e.target.value)}
						value={title}
						required
					/>
				</label>
				<label>
					<span>Recipe Method:</span>
					<textarea
						onChange={e => setMethod(e.target.value)}
						value={method}
						required
					/>
				</label>
        <label>
					<span>Cooking Time (minutes):</span>
					<input
            type='number'
						onChange={e => setcookingTime(e.target.value)}
						value={cookingTime}
            required
					/>
				</label>
        <button className='button'>Submit</button>
			</form>
		</div>
	);
}; 

export default Create;
