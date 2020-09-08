import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './header.css';
import { IoIosLogIn, IoIosAddCircleOutline } from "react-icons/io";
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
        this.state = {
            isOpen: false,
            nome: localStorage.nome,
            foto: localStorage.foto
        }

        this.toggle = this.toggle.bind(this);
        this.home = this.home.bind(this);
        this.dashBoard = this.dashBoard.bind(this);
        this.newEvent = this.newEvent.bind(this);
        this.logout = this.logout.bind(this);
        this.loged = this.loged.bind(this);
        this.perfil = this.perfil.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    async componentDidMount() {
        firebase.getUserName((info) => {
            localStorage.nome = info.val().nome
            this.setState({ nome: localStorage.nome })
        })

        firebase.getUserName((info) => {
            localStorage.foto = info.val().foto
            this.setState({ foto: localStorage.foto })
        })
    }

    perfil() {
        this.props.history.replace('/perfil');
    }

    home() {
        this.props.history.replace('/');
    }

    dashBoard() {
        this.props.history.replace('/dashboard');
    }

    newEvent() {
        this.props.history.replace('/dashboard/newevents');
    }

    logout = async () => {
        await firebase.logout()
            .catch((error) => {
                console.log(error);
            });
        localStorage.removeItem("nome");
        this.props.history.push('/');
    }

    loged() {
        if (firebase.getCurrentUid()) {
            return true
        }
        return false;
    }

    render() {
        if (!this.loged())
            return (
                <div>
                    <Navbar id="navbar" color="info" expand="xs">
                        <NavbarBrand onClick={() => this.home()} id="main"><a className="cool-link">Super Events</a></NavbarBrand>

                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem >
                                    <NavLink href="/login"><IoIosLogIn />
                                        <span>Entrar</span></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/register" id="newevent"><IoIosAddCircleOutline />
                                        <span>Criar Evento</span></NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
        )
        if(this.loged())
         return(
            <div>
                <Navbar id="navbar" expand="xs">
                        <NavbarBrand onClick={() => this.home()} id="main"><a className="cool-link">Super Events</a></NavbarBrand>

                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret id="perfil">
                                        {/* <IoIosPerson/> */}
                                        {/* <span>{this.state.nome}</span> */}
                                        <img className="rounded-circle" width='50px' height='50px' src={this.state.foto}></img>
                                    </DropdownToggle>
                                    <DropdownMenu right id="dropdown">
                                        <DropdownItem onClick={() => this.perfil()}>
                                            <span className='font-weight-bold'>{this.state.nome}</span>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={() => this.perfil()}>
                                            Meu Perfil
                                    </DropdownItem>
                                        <DropdownItem onClick={() => this.dashBoard()}>
                                            Meus Eventos
                                    </DropdownItem>
                                        <DropdownItem onClick={() => this.newEvent()}>
                                            Criar Evento
                                    </DropdownItem>
                                        <DropdownItem>
                                            Eventos Comprados
                                    </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={() => this.logout()}>
                                            Sair
                                    </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            );
    }
}

export default withRouter(Header);