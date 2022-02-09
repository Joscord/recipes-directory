import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => (
    <div className='navbar'>
        <nav>
            <Link className='brand' to='/'><h1>Recipe Directory App</h1></Link>
            <Link to='/create'>Create Recipe</Link>
        </nav>
    </div>
)

export default Navbar