import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './SearchBar.css';

const SearchBar = () => {
	// Definimos una pieza de esta para los términos usados en la búsqueda
	const [terms, setTerms] = useState('');
    const history = useHistory();
	// Definimos la función para manejar el envío de la consulta
	const handleSubmit = e => {
		e.preventDefault();
        // Debemos manejar el envío hacia la página de búsqueda. Nótese que construimos un query parameter en la ruta, para poder acceder a este desde la página Search
        history.push(`search?q=${terms}`)

	};
	return (
		<div className='search-bar'>
			<form onSubmit={handleSubmit}>
				<label htmlFor='search'>Search:</label>
				<input
					type='text'
					id='search'
					// Disparamos una función para actualizar el estado de terms
					onChange={e => setTerms(e.target.value)}
					required
				/>
			</form>
		</div>
	);
};

export default SearchBar;
