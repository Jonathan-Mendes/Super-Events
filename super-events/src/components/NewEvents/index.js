import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './newevents.css';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, Progress, Spinner } from 'reactstrap';

class NewEvents extends Component {

    now = new Date;

    constructor(props) {
        super(props);
        this.state = {
            uid: firebase.getCurrentUid(),
            titulo: '',
            imagem: null,
            url: '',
            descricao: '',
            data: '',
            dataFinal: '',
            hora: '',
            horaFinal: '',
            cidades: [],
            estados: [],
            estado: '',
            local: '',
            alert: '',
            progress: 0,
            error: null,
            isLoaded: false
        };
        this.cadastrar = this.cadastrar.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.verificaDate = this.verificaDate.bind(this);
        this.fillCityList = this.fillCityList.bind(this);
        this.formatDate = this.formatDate.bind(this);

    }

    componentDidMount() {
        if (!firebase.getCurrent()) {
            this.props.history.replace('/');
            return null;
        }
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        estados: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
            console.log(this.now);
    }

    cadastrar = async (e) => {
        e.preventDefault();

        if (this.state.titulo !== '' && this.state.imagem !== '' &&
            this.state.imagem !== null && this.state.url !== '' &&
            this.state.imagem !== '' && this.state.descricao !== '' &&
            this.state.data !== '' && this.state.data.length === 10 &&
            this.state.dataFinal !== '' && this.state.dataFinal.length === 10 &&
            this.state.hora !== '' && this.horaFinal !== '' &&
            this.state.local !== '' && this.state.estado !== '' ) 
            {
            let event = firebase.app.ref('events');
            let chave = event.push().key;
            await event.child(this.state.uid).child(chave).set({
                titulo: this.state.titulo,
                imagem: this.state.url,
                descricao: this.state.descricao,
                data: this.state.data,
                dataFinal: this.state.dataFinal,
                hora: this.state.hora,
                horaFinal: this.state.horaFinal,
                estado: this.state.estado,
                local: this.state.local,
                autor: localStorage.nome
            });
            this.props.history.push('/dashboard');
        } else {
            this.setState({ alert: 'Preencha todos os campos corretamente!' });
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

    fillCityList() {

        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/" +
            this.state.estado + "/municipios")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        cidades: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    formatDate(ini, fim) {
        return this.state.data.slice(ini, fim);
    }

    verificaDate(){
    //implementar
        let dia = this.formatDate(8,10)
        console.log(dia);
        return false
    }

    render() {
        const { error, isLoaded, estados, cidades } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <div id="spinner">
                    <Spinner style={{ width: '6rem', height: '6rem' }} color="dark" />
                </div>);
        } else {

            return (
                <div>
                    <header id="new">
                        <Link to="/dashboard">Voltar</Link>
                    </header>
                    <Form onSubmit={this.cadastrar} id="new-post">
                        <span>{this.state.alert}</span>

                        <FormGroup>
                            <Input id="ficheiro" type="file"
                                onChange={this.handleFile} class="btn btn-primary"/>
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
                            <Label for="exampleSelect">Estado:</Label>
                            <Input type="select" name="select" id="selectEStados"
                                onChange={(e) => this.setState({ estado: e.target.value })}>
                                <option value=''></option>
                                {estados.map(estado => (
                                    <option value={estado.id}>
                                        {estado.nome}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleSelect">Local do Evento:</Label>
                            <Input type="select" name="select" id="selectEStados"
                                onChange={(e) => this.setState({ local: e.target.value })}>
                                {this.fillCityList()}
                                {cidades.map(cidade => (
                                    <option value={cidade.nome}>
                                        {cidade.nome}
                                    </option>
                                ))}
                            </Input>
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
}

export default withRouter(NewEvents);