import React from 'react';
import {Navbar,NavbarBrand,} from 'reactstrap';

const NavBar = (props) => {
 
  return (
    <div>
      <Navbar color="dark"  light expand="md">
        <NavbarBrand href="/"  style={{margin:"auto",color:"white"}}>CARLA</NavbarBrand>
      </Navbar>
    </div>
  );
}

export default NavBar;
