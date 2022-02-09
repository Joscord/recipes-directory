import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => (
    <div className='navbar'>
        <nav>
            <NavLink to='/'><h1>Recipe Directory App</h1></NavLink>
            <NavLink to='/create'>Create Recipe</NavLink>
        </nav>
    </div>
)

export default Navbar