import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Home from './pages/Home/Home';
import Recipe from './pages/Recipe/Recipe';
import Search from './pages/Search/Search';
import Create from './pages/Create/Create';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/recipe' component={Recipe}/>
          <Route path='/search' component={Search}/>
          <Route path='/create' component={Create}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
