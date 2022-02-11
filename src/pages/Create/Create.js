import { useEffect, useRef, useState } from 'react';
import { projectFirestore } from '../../firebase/config';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Create.css';

const Create = () => {
	const [title, setTitle] = useState('');
	const [method, setMethod] = useState('');
	const [cookingTime, setcookingTime] = useState('');
	const [newIngredient, setNewIngredient] = useState('');
	const [ingredients, setIngredients] = useState([]);
	const ingredientInputRef = useRef(null);
	const history = useHistory();

	// Convertiremos esta función en asíncrona para así poder usar await
	const handleSubmit = async (e) => {
		e.preventDefault();
		// Este es el documento que queremos envíar
		const doc = {
			title,
			ingredients,
			method,
			cookingTime: cookingTime+' minutes'
		}
		// Usamos un bloque try catch sólo para detectar cualquier error
		try {
			// Para añadir el proyecto a la colección. El método add agrega el documento y también un id automático. Nótese que usamos await para que espere este proceso antes de seguir a la siguiente línea
			await projectFirestore.collection('recipes').add(doc);
			// Redireccionamos al usuario
			history.push('/');
			
		} catch (err) {
			console.log(err.message)
		}
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
