import React, { Component } from 'react';
import {ThemeProvider } from "@streetscape.gl/monochrome";
import {UI_THEME } from "../variables/constants";
import CarlaViz from '../components/CarlaViz';
import { Redirect } from 'react-router-dom';


class Carla extends Component {

render(){

    if(!this.props.carla){return <Redirect to="/home"/>};
    
    return (
        <div>
            <ThemeProvider theme={UI_THEME}>
                <CarlaViz {...this.props}/>
            </ThemeProvider>
        </div>
    );
}
}

export default Carla;
