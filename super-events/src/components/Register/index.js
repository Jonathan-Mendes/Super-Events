import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './register.css';
import { Button, Form, FormGroup, Label, Input, Progress, FormText } from 'reactstrap';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            email: '',
            password: '',
            imagem: 'https://firebasestorage.googleapis.com/v0/b/super-events-f85d9.appspot.com/o/logo%2Flogo-se.PNG?alt=media&token=1298ad74-3cee-4304-950d-35234aea3250'
        };
        this.register = this.register.bind(this);
        this.onRegister = this.onRegister.bind(this);
    }

    register(e) {
        e.preventDefault();
        this.onRegister();
    }

    onRegister = async () => {
        try {
            const { nome, email, password, imagem } = this.state;

            await firebase.register(nome, email, password, imagem);
            this.props.history.replace('/dashboard');

        } catch (error) {
            alert(error.message);
        }
    }

    render() {
        return (
            <div>
                <h1 className="register-h1">Novo Usuário</h1>
                <Form onSubmit={this.register} id="register">

                    <FormGroup>
                        <Label for="name">Nome:</Label>
                        <Input id="name" type="text" value={this.state.nome} autoFocus autoComplete="off" placeholder="Nome"
                            onChange={(e) => this.setState({ nome: e.target.value })} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="email">Email:</Label>
                        <Input id="email" type="email" value={this.state.email} autoComplete="off" placeholder="email@email.com"
                            onChange={(e) => this.setState({ email: e.target.value })} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="pass">Senha:</Label>
                        <Input id="pass" type="password" value={this.state.password} autoComplete="off" placeholder="Sua senha"
                            onChange={(e) => this.setState({ password: e.target.value })} />
                    </FormGroup>

                    <Button type="submit" color="info">Cadastrar</Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(Register);