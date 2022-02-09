import { Link } from 'react-router-dom';
import './RecipesList.css';

const RecipesList = ({ recipes }) => {
	return (
		<div className='recipes-list'>
			{recipes.map(({ id, title, cookingTime, method }) => (
				<div key={id} className='card'>
					<h2>{title}</h2>
					<p>{cookingTime} to make.</p>
					<div>
						{/* Nótese que creamos un substring del método para luego mostrar más info cuando la persona navegue al detalle de la receta */}
						{method.substring(0, 100)}
						<Link to={`/recipes/${id}`}>More info!</Link>
					</div>
				</div>
			))}
		</div>
	);
};
export default RecipesList;
