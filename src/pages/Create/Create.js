import { useRef, useState } from 'react';
import './Create.css';

const Create = () => {
	const [title, setTitle] = useState('');
	const [method, setMethod] = useState('');
	const [cookingTime, setcookingTime] = useState('');
	// Creamos una pieza de estado para el ingrediente que vamos a agregar
	const [newIngredient, setNewIngredient] = useState('');
	// Creamos una pieza de estado para los ingredientes
	const [ingredients, setIngredients] = useState([]);
	// Usamos una referencia para manejar el focus hacia el input del ingrediente
	const ingredientInputRef = useRef(null);

	const handleSubmit = e => {
		e.preventDefault();
	};

	// Definimos una función para añadir el ingrediente nuevo al arreglo
	const handleClick = e => {
		// Prevenimos el comportamiento por default
		e.preventDefault();
		// Dejamos todo sin espacio y en minúsculas para poder comparar
		const newIng = newIngredient.trim().toLowerCase();
		// Comprobamos si el ingrediente nuevo existe y si no está en el arreglo
		if (newIng && !ingredients.includes(newIng)) {
			setIngredients(prevIngredients => [...prevIngredients, newIng]);
		}
    // Reseteamos el valor del input
    setNewIngredient('');
    // Usamos el método focus para devolver el focus hacia el input, a través de la ref
    ingredientInputRef.current.focus();
		console.log(ingredients);
	};

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
					<span>Recipe Ingredients:</span>
					<div className='ingredients'>
						{/* Lo que haremos es ir añadiendo un ingrediente a la vez */}
						<input
							type='text'
							value={newIngredient}
							onChange={e => setNewIngredient(e.target.value)}
              ref={ingredientInputRef}
						/>
						<button className='button' onClick={handleClick}>
							Add
						</button>
					</div>
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
