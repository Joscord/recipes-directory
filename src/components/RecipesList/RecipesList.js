import { Link } from 'react-router-dom';
import './RecipesList.css';

const RecipesList = ({ recipes }) => {
	if (recipes.length === 0) return <div className='error'>No Recipes to Load</div>
	return (
		<div className='recipes-list'>
			{recipes.map(({ id, title, cookingTime, method }) => (
				<div key={id} className='card'>
					<h2>{title}</h2>
					<p>{cookingTime} to make.</p>
					<div>
						{method.substring(0, 100)}
						<Link to={`/recipes/${id}`}>More info!</Link>
					</div>
				</div>
			))}
		</div>
	);
};
export default RecipesList;
