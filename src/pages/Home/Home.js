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
		// Almacenamos esto en una constante porque nos retorna una función  que nos desuscribe de onSnapshot y así dejamos de escuchar a cambios en el snapshot
		const unsub = projectFirestore
			.collection('recipes')
			// Usamos el método onSnapshot. Este método se dispara la primera vez cuando nos conectamos por primera vez a esa colección. Luego cada vez que se gatille un evento en la colección va a disparar un snapshot event. Es decir que si por ejemplo borramos algo, mandará un nuevo snapshot y la función se disparará de nuevo. Ahora el primer argumento de esta función es la función que disparamos cada vez que recibimos un snapshot. El segundo argumento es una función que se dispara cuando tenemos un error
			.onSnapshot(snapshot => {
				if (snapshot.empty) {
					setError('No recipes to load');
					setIsPending(false);
					// Con esto nos aseguramos que no se muestre nada en la UI si se borra el último item
					setRecipes([]);
				} else {
					let results = [];
					snapshot.docs.forEach(doc =>
						results.push({
							id: doc.id,
							...doc.data(),
						})
					);
					// Luego simplemente actualizo el estado con results
					setRecipes(results);
					// Cambiamos el estado de pendiente
					setIsPending(false);
				}
			}, err => {
				setError(err.message);
				setIsPending(false);
			})
			// el catch desaparece porque esta no es la forma con la que lidiamos con errores cuando trabajamos con una realtime collection sino que con el segundo argumento de onSnapshot que es una función que maneja el error

			// Debemos limpiar las suscripciones con una función de cleanup. Si nos vamos a otra página lejos de Home, onSnapshot sigue activo y escuchando por cambios y si ocurre un cambio va a intentar actualizar el estado de este componente pero está desmontado y no en el DOM, por lo que tendremos leaks de memoria. Retornamos unsub para limpiar la suscripción onSnapshot
			return () => unsub()
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
