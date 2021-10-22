import react, { useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { UserContext } from './components/Context Component/Context';
import AuthenticationComponent from './components/Authentication Component/AuthenticationComponent';
import './App.css';
import Header from './Global Components/Header';
import LogIn from './components/Authentication Component/LogIn';
import CreateAccount from './components/Authentication Component/CreateAccount';
import deleteAccount from './components/Settings Component/DeleteAccount';
import Dashboard1 from './components/Dashboard Component/Dashboard1';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteAccountForm from './components/Settings Component/DeleteAccountForm';
import NavBar from './components/Nav Components/NavBar';

function App() {

  //token used for auth???
  const [token, setToken] = useState();
  const [userState, setUserState] = useState();

 
  return (
    <UserContext.Provider value={{ user: userState }}>
      <div className='App'>
        <Router>
            <Switch>
              <Route exact path="/"> <AuthenticationComponent /></Route>
              <Route exact path="/Log In" component={LogIn}></Route>
              <Route exact path="/Create Account" component={CreateAccount}></Route>
              <Route exact path="/your-dashboard" component={Dashboard1}></Route>
              <Route  path="/my-account"  exact component={DeleteAccountForm}></Route>
            </Switch>
          </Router>
      </div>
    </UserContext.Provider>

  );
}



export default App;
