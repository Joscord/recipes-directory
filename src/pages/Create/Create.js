import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useFetch } from '../../hooks/useFetch';
import './Create.css';

const Create = () => {
	const [title, setTitle] = useState('');
	const [method, setMethod] = useState('');
	const [cookingTime, setcookingTime] = useState('');
	const [newIngredient, setNewIngredient] = useState('');
	const [ingredients, setIngredients] = useState([]);
	const ingredientInputRef = useRef(null);
	// Usamos el hook useHistory para manejar el historial del usuario obteniendo una instancia del historial
	const history = useHistory();
	const { postData, data, error } = useFetch('http://localhost:3000/recipes', 'POST');
	// Podemos usar useEffect en este componente y ver cómo varía data
	useEffect(() => {
		// Si data es distinto de null (es decir si obtenemos un objeto de respuesta de la solicitud POST)...
		if (data) {
			// Redirigimos con el método push de history
			history.push('/');
		}
	}, [data]);

	const handleSubmit = e => {
		e.preventDefault();
		postData({
			title,
			ingredients,
			method,
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
