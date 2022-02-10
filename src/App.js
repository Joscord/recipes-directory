import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Home from './pages/Home/Home';
import Recipe from './pages/Recipe/Recipe';
import Search from './pages/Search/Search';
import Create from './pages/Create/Create';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import ThemeSelector from './components/ThemeSelector/ThemeSelector';
import useTheme from './hooks/useTheme';

const App = () => {
  // Destructuramos el modo de nuestro hook customizado
  const { mode } = useTheme();
  return (
    <BrowserRouter>
      {/* Usando template strings damos una clase de light o dark dependiendo del modo. Además de la clase App */}
      <div className={`${mode} app`}>
        <Navbar/>
        <ThemeSelector/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/recipes/:id' component={Recipe}/>
          <Route path='/search' component={Search}/>
          <Route path='/create' component={Create}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
