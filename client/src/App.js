import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import DogCreate from './components/DogCreate/DogCreate';
import Details from './components/Details/Details';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/dogs' component={DogCreate}/>
      <Route path='/dogs/:id' component={Details}/>
      </Switch>
      {/* <h1>Henry Dogs</h1> */}
    </div>
    </BrowserRouter>
  );
}

export default App;
