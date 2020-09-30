import React from 'react';
import './App.css';
import { createBrowserHistory } from "history";
import NavBar from './components/NavBar';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Home from './views/Home';
const hist = createBrowserHistory();

function App() {
  return (
    <Router history={hist}>
    <NavBar/>
    <Switch>
    <Route path="/home" component={Home}/>
    <Redirect to="/home"/>
    </Switch>
  </Router>
  );
}

export default App;
