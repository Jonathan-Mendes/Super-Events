import React, { Component } from 'react'
import { Form, Button } from 'reactstrap';
import './header.css';
import { IoIosLogIn } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

class Header extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar id="navbar" expand="md" className="fixed-top">
                    <NavbarBrand href="/">Super Events</NavbarBrand>

                    <Form className="form-inline my-2 my-lg-0">
                        <input id="inpSearch" className="form-control mr-sm-2" type="search" placeholder="Pesquisar" aria-label="Search"></input>

                        <Button id="btnSearch" className="btn btn-success my-2 my-sm-0" type="submit"><FaSearch /></Button>
                    </Form>

                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/login"><IoIosLogIn />
                                    <span>Entrar</span></NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div >
        );
    }
}

export default Header;