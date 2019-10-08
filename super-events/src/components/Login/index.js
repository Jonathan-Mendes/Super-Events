import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './login.css';
//import * as admin from 'firebase-admin';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.entrar = this.entrar.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        //Verificar se tem algum usuário logado
        if (firebase.getCurrent()) {
            return this.props.history.replace('/dashboard');
        }

        // admin.initializeApp({
        //     credential: admin.credential.applicationDefault(),
        //     databaseURL: 'https://super-events-f85d9.firebaseio.com'
        //   });
    }

    entrar(e) {
        e.preventDefault();
        this.login();
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


    // resetPass(appName, email){
    //     admin.auth().generatePasswordResetLink(email)
    //       .then((link) => {
    //         link = 'https://www.youtube.com/?reload=9';
    //         return sendCustomPasswordResetEmail(email, appName, link);
    //       })
    //       .catch((error) => {
    //         // Some error occurred.
    //       });
    // }

    // recuperarSenha() {
    //     const email = firebase.getCurrent();
    //     const appName = "SuperEvents";
    //     let aux = resetPass(appName, email);
    //     aux.then(function() {
    //       console.log('email sent!');
    //     }).catch(function(error) {
    //       // An error happened.
    //     });
    // }
    
    
    // // Admin SDK API to generate the email verification link.
    // const useremail = 'user@example.com';
    // admin.auth().generateEmailVerificationLink(useremail, actionCodeSettings)
    //   .then((link) => {
    //     // Construct email verification template, embed the link and send
    //     // using custom SMTP server.
    //     return sendCustomVerificationEmail(useremail, displayName, link);
    //   })
    //   .catch((error) => {
    //     // Some error occurred.
    //   });

    render() {
        return (
            <div>
                <h1 className="login-h1">Sign in to Super Events</h1>
                <Form onSubmit={this.entrar} id="login">
                    <FormGroup>
                        <Label>Email: </Label>
                        <Input type="email" autoComplete="off" autoFocus value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })} placeholder="email@gmail.com" />
                    </FormGroup>

                    <FormGroup>
                        <Label>Password: </Label>
                        <Input type="password" autoComplete="off" value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value })} placeholder="Sua senha" />
                    </FormGroup>

                    <Button type="submit" color="info">Entrar</Button>

                    <Link to="/register">Ainda não possui conta?</Link>

                    <Link>Esqueci minha senha</Link>
                </Form>
            </div>
        );
    }
}

export default withRouter(Login);