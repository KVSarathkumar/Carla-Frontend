import React, { Component } from 'react';
import { Button ,Container} from 'reactstrap';
import {ThemeProvider } from "@streetscape.gl/monochrome";
import {UI_THEME } from "../variables/constants";
import CarlaViz from '../components/CarlaViz';


class Home extends Component {
state={
    carla:false
};

ToggleCarla=()=>{

    this.setState({carla:!this.state.carla});

    //api call to on/off the carla instance
}



render(){
    return (
        <div>
                {
                this.state.carla?
                <ThemeProvider theme={UI_THEME}>
                    <CarlaViz toggle={this.ToggleCarla}/>
                </ThemeProvider>
                :null  
                }
             <Container style={{textAlign:"center"}}>
                <Button style={{marginTop:"50px"}} onClick={()=>this.ToggleCarla()} color="primary" >{ this.state.carla?"Stop ":"Start "} Carla</Button>
            </Container>
        </div>
    )
}
}

export default Home;
