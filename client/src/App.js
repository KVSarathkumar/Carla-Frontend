import React, { Component } from 'react';
import './App.css';
import { createBrowserHistory } from "history";
import NavBar from './components/NavBar';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Home from './views/Home';
import Carla from './views/Carla';
const hist = createBrowserHistory();

class App extends Component {

  state={
    carla:false
};

ToggleCarla=()=>{

   localStorage.setItem("carla",!this.state.carla);
    this.setState({carla:!this.state.carla});
    
    //api call to on/off the carla instance
}

componentDidMount=()=>{
  this.setState({carla:localStorage.getItem("carla")==="true"?true:false});
}

  render(){
  return (
    <Router history={hist}>
    <NavBar/>
    <Switch>
    <Route path="/home" render={(props) => <Home {...props} toggle={this.ToggleCarla} carla={this.state.carla}/>} />
    <Route path="/carla" render={(props) => <Carla {...props} toggle={this.ToggleCarla} carla={this.state.carla}/>}/>
    <Redirect to="/home"/>
    </Switch>
  </Router>
  );
  }
}

export default App;
