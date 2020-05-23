import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
  } from 'reactstrap';

const NavBar = props => {
    return (
        <Navbar color="faded" light>
            <NavbarBrand href="/" className="mr-auto">Stock Portfolio</NavbarBrand>
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