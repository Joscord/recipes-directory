import { Link } from 'react-router-dom';
// Para acceder al contexto usamos un hook llamado useContext
import { useContext } from 'react';
// Importamos el contexto NO el proveedor
import { ThemeContext } from '../../context/ThemeContext';
import SearchBar from '../SearchBar/SearchBar';
import './Navbar.css';

const Navbar = () => {
	// Usamos el hook para acceder al contexto. Esto nos provee con el valor del objeto pasado en la prop value.
	const { color } = useContext(ThemeContext);

	return (
        // Podemos ahora usar el color, por ejemplo para estilizar el navbar
		<div className='navbar' style={{background: color}}>
			<nav>
				<Link className='brand' to='/'>
					<h1>Recipe Directory App</h1>
				</Link>
				<SearchBar />
				<Link to='/create'>Create Recipe</Link>
			</nav>
		</div>
	);
};

export default Navbar;
