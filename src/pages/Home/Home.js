import './Home.css';
import { useEffect, useState } from 'react';
import RecipesList from '../../components/RecipesList/RecipesList';
import { projectFirestore } from '../../firebase/config';

const Home = () => {
	const [recipes, setRecipes] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsPending(true);

		projectFirestore
			.collection('recipes')
			.get()
			.then(snapshot => {
				if (snapshot.empty) {
					setError('No recipes to load');
					setIsPending(false);
				} else {
					let results = [];
					snapshot.docs.forEach(doc =>
						results.push({
							// Creamos un documento para empujar a los resultados. El objeto tiene una prop id que es igual al id que viene en doc y el resto de la data (title, cookingTime...) que viene dada por el método data. Ojo que esto es un objeto así que usamos el spread operator (...) para esparcir las propiedades del objeto en el nuevo objeto.
							id: doc.id,
							...doc.data(),
						})
					);
					// Luego simplemente actualizo el estado con results
					setRecipes(results);
					// Cambiamos el estado de pendiente
					setIsPending(false);
				}
			})
			// Añadimos un catch para capturar el error si hay uno
			.catch(err => {
				setError(err.message);
				// Y nuevamente cambiamos el estado de isPending
				setIsPending(false);
			});
	}, []);
	return (
		<div className='home'>
			{error && <p className='error'>{error}</p>}
			{isPending && <p className='loading'>Loading Recipes...</p>}
			{recipes && <RecipesList recipes={recipes} />}
		</div>
	);
};

export default Home;
