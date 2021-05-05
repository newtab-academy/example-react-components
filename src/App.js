import './App.css';
import CustomForm from './custom-form/CustomForm';
import Extrato from './extrato/Extrato';
import Header from './header/Header'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import List from './list/List';
import Catalogo from './catalogo/Catalogo';


function App() {
  return <>
    <Router>
      <Link to="/">Home</Link>
      <Link to="/catalogo">Catalogo</Link>


      <Switch>
        
        <Route path="/catalogo">
          <Catalogo />
        </Route>

        <Route path="/">
          <List loggedUser={{name:"fernando", id:38}}  currentDay={(() => { return new Date(); })() } />
        </Route>
      </Switch>
    </Router>
  </>
}

export default App;
