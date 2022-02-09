import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Home from './pages/Home/Home';
import Recipe from './pages/Recipe/Recipe';
import Search from './pages/Search/Search';
import Create from './pages/Create/Create';
import './App.css';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar/>
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
