import React, { Component } from 'react';
import firebase from '../../firebase';
import { tsImportEqualsDeclaration } from '@babel/types';
import { FaFileUpload, FaThumbsDown } from "react-icons/fa";
import { Container, Row, Col, Button, Input, Label } from 'reactstrap'

class Perfil extends Component {

    constructor(props) {
        super(props);
        this.state = {
            foto: null,
            nome: '',
            cpf: '',
            email: firebase.getCurrent(),
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

    alterar(e) {
        let elements = document.getElementsByClassName('edit')
        elements[0].disabled = false
        elements[1].disabled = false
        elements[2].style.display = 'block'
        elements[4].style.display = 'none'
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
                        <Col xs='12' sm='12' md='12' lg='12'>
                            <Row>
                                <img className='rounded-circle my-1 mx-auto' width='200px' height='200px' src={this.state.foto} />
                            </Row>
                            <Row>
                                {/* <Label for='nome' className='w-10'>Nome</Label> */}
                                <Input id='nome' type='text' className='w-50 my-1 mx-auto edit' value={this.state.nome} disabled />
                            </Row>
                            <Row>
                                {/* <Label for='cpf'>CPF</Label> */}
                                <Input id='cpf' type='text' className='w-50 my-1 mx-auto edit' value={this.state.cpf} disabled />
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='12' sm='12' md='12' lg='12' className="text-center my-3">
                            <Button color="success" className="mx-3 edit d-none">Salvar</Button>
                            <Button color="danger" className="mx-3 edit d-none">Cancelar</Button>
                            <Button color="success" className='edit' onClick={(e) => this.alterar(e.target)}>Alterar</Button>
                        </Col>
                    </Row>

                </Container>
            </div>
        );
    }
}

export default Perfil;