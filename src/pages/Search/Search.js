import './Search.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useFetch } from '../../hooks/useFetch';
import RecipesList from '../../components/RecipesList/RecipesList'

const Search = () => {
	// Obtenemos la query string primero, para esto usamos useLocation para obtener un objeto, cuya propiedad search nos devuelve el query string
	const queryString = useLocation().search;
	// Luego extraemos los parámetros usando URLSearchParams y pasando la URL
	const queryParams = new URLSearchParams(queryString);
	// Finalmente para obtener los términos de la query
	const query = queryParams.get('q');
  // Construimos el endpoint para buscar las recetas. json-server se encargará de buscar las recetas que incluyan esta query
  const url = `http://localhost:3000/recipes?q=${query}`
  // Usamos useFetch para realizar la consulta
  const {data:recipes, isPending, error }= useFetch(url);

	return (
    <div>
      <h2 className='page-title'>Recipes including {query}</h2>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Recipes Loading... </p>}
      {
        recipes && <RecipesList recipes={recipes}/>
      }
    </div>
  )
};

export default Search;
