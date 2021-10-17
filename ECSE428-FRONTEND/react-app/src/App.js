import react, { useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { UserContext } from './components/Context Component/Context';
import AuthenticationComponent from './components/Authentication Component/AuthenticationComponent';
import dashboard from './components/Dashboard Component/dashboard';
import './App.css';
import Header from './Global Components/Header';
import LogIn from './components/Authentication Component/LogIn';
import CreateAccount from './components/Authentication Component/CreateAccount';
import deleteAccount from './components/Settings Component/DeleteAccount';


function App() {

  //token used for auth???
  const [token, setToken] = useState();
  const [userState, setUserState] = useState();

 
  return (
    <UserContext.Provider value={{ user: userState }}>
      <div className='App'>
      <Header/>
        <div className="content-margin">
          <Router>
            <Switch>
              <Route exact path="/"> <AuthenticationComponent /></Route>
              <Route exact path="/Log In" component={LogIn}></Route>
              <Route exact path="/Create Account" component={CreateAccount}></Route>
              <Route exact path="/your-dashboard" component={dashboard}></Route>
              <Route exact path="/deleteAccount" component={deleteAccount}></Route>
            </Switch>
          </Router>
        </div>
     
      </div>
    </UserContext.Provider>

  );
}



export default App;
