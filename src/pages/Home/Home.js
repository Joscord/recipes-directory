import './Home.css';
import { useFetch } from '../../hooks/useFetch';
import RecipesList from './RecipesList'

const Home = () => {
  const url = 'http://localhost:3000/recipes'
  const { data: recipes, isPending, error } = useFetch(url);  

  return (
    <div>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading Recipes...</p>}
      {recipes && <RecipesList recipes={recipes}/>}
    </div>
  )
}

export default Home