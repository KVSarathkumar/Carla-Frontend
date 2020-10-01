import React, { Component } from 'react';
import { Button ,Container} from 'reactstrap';
import { Redirect } from 'react-router-dom';


class Home extends Component {

render(){
   
    if(this.props.carla){return <Redirect to="/carla"/>};

  
    return (
        <div>
             <Container style={{textAlign:"center"}}>
                <Button style={{marginTop:"50px"}} onClick={()=>{this.props.history.push("/carla");this.props.toggle()}} color="primary" >Start Carla</Button>
            </Container>
        </div>
    )
}
}

export default Home;
