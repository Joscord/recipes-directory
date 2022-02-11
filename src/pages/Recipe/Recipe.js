import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
// importamos el objeto de firestore
import { projectFirestore } from '../../firebase/config';
import useTheme from '../../hooks/useTheme';
import './Recipe.css';


const Recipe = () => {
	// Nuevamente necesitamos 3 piezas de estado
	const [recipe, setRecipe] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	const { id } = useParams();
	const { mode } = useTheme()
	// Usamos useEffect nuevamente
	useEffect(() => {
		// Dejamos el estado de pendiente como true como parte del inicio del proceso de fetching. Esta vez lo hice con async/await para mostrar que funciona del mismo modo
		setIsPending(true);
		const firestoreFetch = async (id) => {
			// Hacemos todo dentro de un bloque try/catch
			try {
				// Esta vez usamos el método doc, que acepta un id, para tener una referencia al documento en específico de la colección
				const recipeRef = await projectFirestore.collection('recipes').doc(id);
				// Ahora obtenemos el snapshot del documento con get(), también es asíncrono
				const recipeSnapshot = await recipeRef.get();
				// Evaluamos si el documento existe gracias a la propiedad exists del snapshot
				if (recipeSnapshot.exists) {
					// Terminamos el loading
					setIsPending(false);
					// Cambiamos el estado pasando la data de la nueva recipe con el método data
					setRecipe(recipeSnapshot.data());
				} else {
					throw new Error('Recipe does not exist')
				}
			} catch (err) {
				setError(err.message);
				setIsPending(false);
			}
		}
		firestoreFetch(id);
	}, [])

	return (
		<div className={`recipe ${mode}`}>
			{error && <p>{error}</p>}
			{isPending && <p>Loading Recipe...</p>}
			{recipe && (
				<>
					<h2>{recipe.title}</h2>
					<ul>
            {
              recipe.ingredients.map(ing => (
                <li key={ing}>{ing}</li>
              ))
            }
          </ul>
					<p>{recipe.method}</p>
					<p>{recipe.cookingTime}</p>
				</>
			)}
		</div>
	);
};

export default Recipe;
