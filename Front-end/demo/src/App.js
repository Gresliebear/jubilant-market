import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import NavBar from './components/NavBar';
import About from './pages/About';
import Users from './pages/Users';
import Home from './pages/Home';

function App() {

// you can a javascript 5 differents or more 
  
  return (
    // JSX 
    <div className="App">
    <Router>
      <NavBar/>
    <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
