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


function App() {
  return <>
    <Router>
      <Switch>
        <Route path="/">
          <List />
        </Route>
      </Switch>
    </Router>
  </>
}

export default App;
