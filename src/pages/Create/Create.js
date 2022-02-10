import { useRef, useState } from 'react';
// Importamos useFetch
import { useFetch } from '../../hooks/useFetch';
import './Create.css';

const Create = () => {
	const [title, setTitle] = useState('');
	const [method, setMethod] = useState('');
	const [cookingTime, setcookingTime] = useState('');
	const [newIngredient, setNewIngredient] = useState('');
	const [ingredients, setIngredients] = useState([]);
	const ingredientInputRef = useRef(null);
	// Destructuramos las cosas que necesitamos de useFetch. El endpoint que pasamos para hacer un post request es el mismo que para hacer un get request. Pasamos también el segundo argumento, el método.
	const { postData, data, error } = useFetch('http://localhost:3000/recipes', 'POST')

	const handleSubmit = e => {
		e.preventDefault();
		// Invocamos a la función postData. Pasamos el objeto que será la data a añadir al JSON
		postData({
			title,
			ingredients,
			method,
			// En db.json el tiempo de cocción aparece con 'minutes' por lo que se lo concatenamos. Nótese que no debemos pasar un id dado que json-server añade una automáticamente
			cookingTime: cookingTime+' minutes'
		})
	};

	const handleClick = e => {
		e.preventDefault();
		const newIng = newIngredient.trim().toLowerCase();
		if (newIng && !ingredients.includes(newIng)) {
			setIngredients(prevIngredients => [...prevIngredients, newIng]);
		}
    setNewIngredient('');
    ingredientInputRef.current.focus();
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
        {/* Mostramos los ingredientes que llevamos agregados */}
        <p>
          {
            ingredients && ingredients.map(ingredient => (
              <em key={ingredient}>{ingredient}, </em>
            ))
          }
        </p>
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
