import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
// importamos el objeto de firestore
import { projectFirestore } from '../../firebase/config';
import useTheme from '../../hooks/useTheme';
import './Recipe.css';

const Recipe = () => {
	const [recipe, setRecipe] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	const { id } = useParams();
	const { mode } = useTheme();
	useEffect(() => {
		setIsPending(true);
		const unsub = projectFirestore
			.collection('recipes')
			.doc(id)
			// Usamos onSnapshot en lugar de get. Recordemos que esto retorna el método unsub
			.onSnapshot(doc => {
				if (doc.exists) {
					setIsPending(false);
					setRecipe(doc.data());
				} else {
					throw new Error('Recipe does not exist');
				}
			});
		// Retornamos la función de cleanup para dejar de escuchar por cambios en el documento
		return () => unsub();
	}, [id]);
	const handleUpdate = async () => {
		await projectFirestore.collection('recipes').doc(id).update({
			title: 'Something Different',
		});
	};

	return (
		<div className={`recipe ${mode}`}>
			{error && <p>{error}</p>}
			{isPending && <p>Loading Recipe...</p>}
			{recipe && (
				<>
					<h2>{recipe.title}</h2>
					<ul>
						{recipe.ingredients.map(ing => (
							<li key={ing}>{ing}</li>
						))}
					</ul>
					<p>{recipe.method}</p>
					<p>{recipe.cookingTime}</p>
					<button onClick={handleUpdate}>Update</button>
				</>
			)}
		</div>
	);
};

export default Recipe;
