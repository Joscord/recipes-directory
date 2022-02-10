import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useFetch } from '../../hooks/useFetch';
import './Recipe.css';

const Recipe = () => {
	// Usamos useParams para obtener los parámetros de ruta de la URL, específicamente el id
	const { id } = useParams();
	// Invocamos a useFetch y obtenemos la data
	const {
		data: recipe,
		isPending,
		error,
	} = useFetch(`http://localhost:3000/recipes/${id}`);

	return (
		<div className='recipe'>
			{error && <p>{error}</p>}
			{isPending && <p>Loading Recipe...</p>}
			{recipe && (
				<>
					<h2>{recipe.title}</h2>
					<ul>
            {
              recipe.ingredients.map(ing => (
                // Usamos el ingrediente como llave, más adelante nos aseguraremos que no hay ingredientes repetidos
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
