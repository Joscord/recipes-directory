import { Link } from 'react-router-dom';
import './RecipesList.css';
import useTheme from '../../hooks/useTheme';
// importamos el objeto de firestore
import { projectFirestore } from '../../firebase/config';
// importamos el ícono
import deleteIcon from '../../assets/icons/delete-icon.svg';

const RecipesList = ({ recipes }) => {
	const { mode } = useTheme();
	// Definimos la función para manejar el borrado
	const handleDelete = (id) => {
		// Nuevamente usamos el método doc par obtener una referencia del documento. Luego simplemente usamos el método delete() y listo
		projectFirestore.collection('recipes').doc(id).delete();
	}

	if (recipes.length === 0) {
		return <div className='error'>No Recipes to Load</div>;
	}
	return (
		<div className='recipes-list'>
			{recipes.map(({ id, title, cookingTime, method }) => (
				<div key={id} className={`card ${mode}`}>
					<h2>{title}</h2>
					<p>{cookingTime} to make.</p>
					<div>
						{method.substring(0, 100)}
						<Link to={`/recipes/${id}`}>More info!</Link>
					</div>
					<img
						src={deleteIcon}
						alt='x-icon'
						className='delete'
						onClick={() => handleDelete(id)}
					/>
				</div>
			))}
		</div>
	);
};
export default RecipesList;
