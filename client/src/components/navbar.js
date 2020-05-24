import React from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';

const NavBar = props => {
    return (
        <Navbar color="faded" light>
            <Nav className="ml-auto">
                <NavItem>
                <NavLink href="/">Portfolio</NavLink>
                </NavItem>
                <NavItem>
                <NavLink href="/transactions">Transactions</NavLink>
                </NavItem>
                <NavItem>
                <NavLink href="/login">Login</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
  };
  
  export default NavBar;