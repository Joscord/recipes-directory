import { Link } from 'react-router-dom';
// Importamos el custom-hook useTheme
import useTheme from '../../hooks/useTheme';
import SearchBar from '../SearchBar/SearchBar';
import './Navbar.css';

const Navbar = () => {
	// Invocamos el custom hook. El custom hook nos devuelve el objeto de value y destructuramos la prop de color de este
	const { color } = useTheme();
	return (
		<div className='navbar' style={{ background: color }}>
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
