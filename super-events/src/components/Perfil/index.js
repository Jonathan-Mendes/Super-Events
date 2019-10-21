import React, { Component } from 'react';
import firebase from '../../firebase';
import { tsImportEqualsDeclaration } from '@babel/types';
import { FaFileUpload, FaThumbsDown } from "react-icons/fa";
import { Container, Row, Col, Button } from 'reactstrap'

class Perfil extends Component {

    constructor(props) {
        super(props);
        this.state = {
            foto: null,
            nome: '',
            cpf: '',
            email: firebase.getCurrent()
        }
        this.alterar = this.alterar.bind(this)
    }

    async componentDidMount() {
        firebase.getUserName((info) => {
            localStorage.nome = info.val().nome
            localStorage.cpf = info.val().cpf
            localStorage.foto = info.val().foto
            this.setState({ nome: localStorage.nome, foto: localStorage.foto, cpf: localStorage.cpf })
        })
    }

    alterar(e){ 
        console.log(e)
        e.className = 'd-none'
    }

    render() {

        return (
            <div>
                <Container className="mx-auto">
                    <Row className="mt-5">
                        <Col xs='12' sm='12' md='12' lg='12'>
                            <h5 id="title">Meu Perfil</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='12' sm='12' md='12' lg='12' className="text-center">
                            <img className='rounded-circle' width='200px' height='200px' src={this.state.foto} />
                            {/* <Button color='info' className='rounded-circle'><span><FaFileUpload /></span></Button> */}
                            <h1>{this.state.nome}</h1>
                            <h1>{this.state.email}</h1>
                            <h1>{this.state.cpf}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='12' sm='12' md='12' lg='12' className="text-center my-3">
                            <Button color="success" className="mx-3 d-none">Salvar</Button>
                            <Button color="danger" className="mx-3 d-none">Cancelar</Button>
                            <Button color="success" className='' onClick={(e) => this.alterar(e.target)}>Alterar</Button>
                        </Col>
                    </Row>

                </Container>
            </div>
        );
    }
}

export default Perfil;