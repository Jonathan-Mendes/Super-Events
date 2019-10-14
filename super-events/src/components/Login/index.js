import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './login.css';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailResetPassword: '',
            email: '',
            password: '',
            modal: false,
            unmountOnClose: true
        };
        this.entrar = this.entrar.bind(this);
        this.login = this.login.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.toggle = this.toggle.bind(this);
        this.changeUnmountOnClose = this.changeUnmountOnClose.bind(this);
    }

    componentDidMount() {
        //Verificar se tem algum usuário logado
        if (firebase.getCurrent()) {
            return this.props.history.replace('/dashboard');
        }
    }

    entrar(e) {
        e.preventDefault();
        this.login();
    }

    resetPassword() {
        if (firebase.resetPassword(this.state.emailResetPassword)) {
            alert('E-mail enviado com sucesso!')
        } else {
            alert('Este usuário não existe!')
        }
    }

    login = async () => {
        const { email, password } = this.state;

        try {
            await firebase.login(email, password)
                .catch((error) => {
                    if (error.code === 'auth/user-not-found') {
                        alert('Esse usuário não existe!');
                    } else {
                        alert('Codigo de erro: ' + error.code);
                        return null;
                    }
                });
            this.props.history.replace('/dashboard');

        } catch (error) {
            alert(error.message);
        }

    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    changeUnmountOnClose(e) {
        let value = e.target.value;
        this.setState({ unmountOnClose: JSON.parse(value) });
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.entrar} id="login" className="my-2">
                    <h4 className="text-info text-center mb-5">Entrar no Super Events</h4>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input type="email" autoComplete="off" autoFocus value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })} placeholder="email@gmail.com" required />
                    </FormGroup>

                    <FormGroup>
                        <Label>Password</Label>
                        <Input type="password" autoComplete="off" value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value })} minLength="4" placeholder="Sua senha" required />
                    </FormGroup>

                    <Button type="submit" color="info">Entrar</Button>

                    <Link to="/register" className="mt-4">Ainda não possui conta?</Link>

                    <Form className="text-center my-2" onSubmit={(e) => e.preventDefault()}>
                        {/* Link className="my-1" to={this.toggle}>Esqueci minha senha</Link> */}
                        <Button outline color="link" onClick={this.toggle}><span className="linkResetSenha">Esqueci minha senha</span></Button>
                    </Form>

                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} unmountOnClose={this.state.unmountOnClose}>
                        <ModalHeader className="text-info" toggle={this.toggle}>Esqueci minha senha</ModalHeader>
                        <ModalBody>
                            <Label className="text-danger">Informe seu e-mail para redefinir sua senha</Label>
                            <Input type="email" placeholder="email@email.com" onChange={(e) => this.setState({ emailResetPassword: e.target.value })} required />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={this.resetPassword}>Enviar E-mail</Button>
                            <Button color="danger" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </Form>
            </div>
        );
    }
}

export default withRouter(Login);