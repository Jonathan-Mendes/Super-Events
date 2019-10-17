import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './register.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import InputMask from 'react-input-mask';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            mask: '999.999.999-99',
            nome: '',
            cpf: '',
            email: '',
            password: '',
            imagem: 'https://firebasestorage.googleapis.com/v0/b/super-events-f85d9.appspot.com/o/logo%2Flogo-se.PNG?alt=media&token=1298ad74-3cee-4304-950d-35234aea3250'
        };
        this.register = this.register.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.validarCPF = this.validarCPF.bind(this);
    }

    onChange = (event) => {
        var value = event.target.value;
        var newState = {
            mask: '999.999.999-99',
            value: value
        };
        if (/^3[47]/.test(value)) {
            newState.mask = '999.999.999-99';
        }
        this.setState(newState);
        this.setState({ cpf: event.target.value });
    }

    register(e) {
        e.preventDefault();
        this.onRegister();
    }

    onRegister = async () => {
        if (this.validarCPF(this.state.cpf)) {
            try {
                const { nome, cpf, email, password, imagem } = this.state;
                await firebase.register(nome, cpf, email, password, imagem);
                // this.props.history.replace('/dashboard');
            } catch (error) {
                alert(error.message);
            }


    }

    validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        let rev;
        let add;

        if (cpf == '') return false;

        if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
            return false;

        add = 0;
        for (let i = 0; i < 9; i++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
            return false;

        add = 0;
        for (let i = 0; i < 10; i++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(10)))
            return false;
        return true;
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.register} id="register" className="my-2">
                    <h4 className="text-center text-info mb-4">Criar Conta</h4>
                    <FormGroup>
                        <Label for="name">Nome</Label>
                        <Input id="name" type="text" value={this.state.nome} autoFocus autoComplete="off" placeholder="Nome"
                            onChange={(e) => this.setState({ nome: e.target.value })} required />
                    </FormGroup>

                    <FormGroup>
                        <Label for="cpf">CPF</Label>
                        <InputMask className="form-control" {...this.state} onChange={this.onChange} id="cpf" value={this.state.cpf}
                            autoComplete="off" placeholder="000.000.000-00" required />
                    </FormGroup>

                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input id="email" type="email" value={this.state.email} autoComplete="off" placeholder="email@email.com"
                            onChange={(e) => this.setState({ email: e.target.value })} required />
                    </FormGroup>

                    <FormGroup>
                        <Label for="pass">Senha</Label>
                        <Input id="pass" type="password" value={this.state.password} autoComplete="off" placeholder="Sua senha"
                            minLength="6" onChange={(e) => this.setState({ password: e.target.value })} />
                    </FormGroup>

                    <Button type="submit" color="info">Cadastrar</Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(Register);