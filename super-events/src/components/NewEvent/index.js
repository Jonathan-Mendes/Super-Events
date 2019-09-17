import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './newevent.css';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, Progress } from 'reactstrap';
import { FaBackspace } from 'react-icons/fa';

class NewEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            imagem: null,
            url: '',
            descricao: '',
            data: '',
            dataFinal: '',
            hora: '',
            horaFinal: '',
            local: '',
            alert: '',
            progress: 0,
        };
        this.cadastrar = this.cadastrar.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    componentDidMount() {
        if (!firebase.getCurrent()) {
            this.props.history.replace('/');
            return null;
        }
    }

    cadastrar = async (e) => {
        e.preventDefault();

        if (this.state.titulo !== '' && this.state.data !== '' && this.state.imagem !== '' && this.state.descricao !== '' && this.state.imagem !== null && this.state.url !== '') {
            let posts = firebase.app.ref('posts');
            let chave = posts.push().key;
            await posts.child(chave).set({
                titulo: this.state.titulo,
                imagem: this.state.url,
                descricao: this.state.descricao,
                data: this.state.data,
                dataFinal: this.state.dataFinal,
                hora: this.state.hora,
                horaFinal: this.state.horaFinal,
                local: this.state.local,
                autor: localStorage.nome
            });
            this.props.history.push('/dashboard');
        } else {
            this.setState({ alert: 'Preencha todos os campos!' });
        }
    }

    handleFile = async (e) => {

        if (e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type === "image/png" || image.type === "image/jpeg") {
                await this.setState({ imagem: image });
                this.handleUpload();
            } else {
                alert('Envie uma imagem do tipo PNG ou JPEG');
                this.setState({ imagem: null });
                return null;
            }
        }
    }

    handleUpload = async () => {
        const { imagem } = this.state;
        const currentUid = firebase.getCurrentUid();
        const uploadTask = firebase.storage
            .ref(`images/${currentUid}/${imagem.name}`)
            .put(imagem);

        await uploadTask.on('state_changed',
            (snapshot) => {
                //Progress
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({ progress: progress });
            },
            (error) => {
                //Error
                console.log('Error imagem: ' + error);
            },
            () => {
                //Sucessful
                firebase.storage.ref(`images/${currentUid}`)
                    .child(imagem.name)
                    .getDownloadURL()
                    .then(url => {
                        this.setState({ url: url });
                    })

            })
    }

    // back = async () =>{
    //     this.props.history.replace( '/dashboard')
    // }

    // <Button color="dark" onClick={() => this.back()}>Voltar</Button>    
    render() {
        return (
            <div>
                <header id="new">
                    <Link to="/dashboard">Voltar</Link>
                </header>
                <Form onSubmit={this.cadastrar} id="new-post">
                    <span>{this.state.alert}</span>

                    <FormGroup>
                        <Input id="ficheiro" type="file"
                            onChange={this.handleFile} />
                        {this.state.url !== '' ?
                            <img src={this.state.url} width="250" height="150" alt="Copa do post" />
                            :
                            // <progress value={this.state.progress} max="100" />
                            <Progress animated color="success" value={this.state.progress} max="100" />
                        }
                        <FormText color="muted">
                            Envie uma imagem do tipo PNG ou JPEG.
                        </FormText>
                    </FormGroup>

                    <FormGroup>
                        <Label for="name">Titulo: </Label>
                        <Input id="name" type="text" value={this.state.titulo} placeholder="Nome do post" autoFocus
                            onChange={(e) => this.setState({ titulo: e.target.value })} />
                    </FormGroup>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="dateIn">Data de Início:</Label>
                                <Input id="dateIn" type="date" value={this.state.data} onChange={(e) => this.setState({ data: e.target.value })} />
                            </FormGroup>
                        </Col>

                        <Col md={6}>
                            <FormGroup>
                                <Label for="dateFi">Data de Término:</Label>
                                <Input id="dateFi" type="date" value={this.state.dataFinal} onChange={(e) => this.setState({ dataFinal: e.target.value })} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="hrIn">Hora de Início:</Label>
                                <Input id="hrIn" type="time" value={this.state.hora} onChange={(e) => this.setState({ hora: e.target.value })} />
                            </FormGroup>

                        </Col>

                        <Col md={6}>
                            <FormGroup>
                                <Label for="hrFi">Hora do Término:</Label>
                                <Input id="hrFi" type="time" value={this.state.horaFinal} onChange={(e) => this.setState({ horaFinal: e.target.value })} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Label for="lcEv">Local do Evento:</Label>
                        <Input id="lcEv" type="text" value={this.state.local} placeholder="Nome da Cidade" onChange={(e) => this.setState({ local: e.target.value })} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="desc">Descrição: </Label>
                        <Input id="desc" type="textarea" value={this.state.descricao} placeholder="Alguma descrição..."
                            onChange={(e) => this.setState({ descricao: e.target.value })} />
                    </FormGroup>

                    <Button type="submit" color="success">Cadastrar</Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(NewEvent);
