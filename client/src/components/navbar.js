import React, {useContext} from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';
import { RootContext } from '../auth/rootContextProvider';

const NavBar = props => {
    const context = useContext(RootContext);

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
                    {context.authenticated ? <NavLink  onClick={context.removeAuthenticated}>Logout</NavLink> :
                    <NavLink href="/login">Login</NavLink>}
                </NavItem>
            </Nav>
        </Navbar>
    );
  };
  
  export default NavBar;