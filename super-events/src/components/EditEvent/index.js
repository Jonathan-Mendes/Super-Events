import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './editevent.css';
import {
    Button, Form, FormGroup, Label, Input, FormText, Col, Row, Progress,
    Spinner, CustomInput, InputGroupAddon, InputGroup, InputGroupText
} from 'reactstrap';
import CurrencyInput from 'react-currency-masked-input'

class EditEvent extends Component {

    now = new Date;

    constructor(props) {
        super(props);
        this.state = {
            uid: '',
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
            cidade: '',
            local: '',
            progress: 0,
            error: null,
            isLoaded: false,
            valorIngresso: false,
            valorIngressoInt: '',
            valorIngressoMeia: ''
        };
        this.cadastrar = this.cadastrar.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.fillCityList = this.fillCityList.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.verificaDate = this.verificaDate.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.verificaTime = this.verificaTime.bind(this);
        this.renderiza = this.renderiza.bind(this);
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

        const { id } = this.props.match.params;
        firebase.app.ref('events').child(id).on('value', (snapshot) => {
            let state = this.state;
            state.event = [];

            state.event = {
                titulo: snapshot.val().titulo,
                autor: snapshot.val().autor,
                descricao: snapshot.val().descricao,
                dataInicial: snapshot.val().data,
                dataFinal: snapshot.val().dataFinal,
                hora: snapshot.val().hora,
                horaFinal: snapshot.val().horaFinal,
                cidade: snapshot.val().cidade,
                local: snapshot.val().local,
                estado: snapshot.val().estado,
                imagem: snapshot.val().imagem,
                valorIngressoInt: snapshot.val().valorIngressoInt,
                valorIngressoMeia: snapshot.val().valorIngressoMeia,
                valorIngresso: snapshot.val().valorIngresso
            };
            //this.state.imagem = this.state.event.imagem;
            this.state.url = this.state.event.imagem;
            this.state.titulo = this.state.event.titulo;
            this.state.hora = this.state.event.hora;
            this.state.horaFinal = this.state.event.horaFinal;
            this.state.estado = this.state.event.estado;
            this.state.cidade = this.state.event.cidade;
            this.state.valorIngressoInt = this.state.event.valorIngressoInt;
            this.state.valorIngressoMeia = this.state.event.valorIngressoMeia;
            this.state.valorIngresso = this.state.event.valorIngresso;
            this.state.autor = this.state.event.autor;
            this.state.local = this.state.event.local;
            this.state.descricao = this.state.event.descricao;
            this.state.data = this.state.event.dataInicial;
            this.state.dataFinal = this.state.event.dataFinal;
            this.setState(state);
        })
    }

    cadastrar = async (e) => {
        e.preventDefault();
        const { id } = this.props.match.params;
        if (true) {
            let event = firebase.app.ref('events');
            await event.child(id).update({
                uid: firebase.getCurrentUid(),
                titulo: this.state.titulo,
                imagem: this.state.url,
                descricao: this.state.descricao,
                data: this.state.data,
                dataFinal: this.state.dataFinal,
                hora: this.state.hora,
                horaFinal: this.state.horaFinal,
                estado: this.state.estado,
                cidade: this.state.cidade,
                local: this.state.local,
                autor: localStorage.nome,
                valorIngressoInt: this.state.valorIngressoInt,
                valorIngressoMeia: this.state.valorIngressoMeia,
                valorIngresso: this.state.valorIngresso
            });
            this.props.history.push('/dashboard');
        } else {
            //this.setState({ alert: 'Preencha todos os campos corretamente!' });
            alert('Preencha todos os campos corretamente!');
            //this.alert = '';
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
        console.log(this.state.url);
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

    formatDate(today, ini, fim) {
        return today.slice(ini, fim);
    }

    formatTime(time, ini, fim) {
        return time.slice(ini, fim)
    }

    verificaTime() {
        let horaIni = this.formatTime(this.state.hora, 0, 2)
        let minIni = this.formatTime(this.state.hora, 3, 5)
        let horaTer = this.formatTime(this.state.horaFinal, 0, 2)
        let minTer = this.formatTime(this.state.horaFinal, 3, 5)

        if (this.state.hora !== '' || this.horaFinal !== '') {
            alert('Hora inválida!');
            return false;
        } else if (this.state.data === this.state.dataFinal && horaIni > horaTer) {
            // this.setState({ alert: 'Hora inválida!' });
            alert('Hora inválida!');
            return false;
        } else if (this.state.data === this.state.dataFinal && horaIni === horaTer && minIni > minTer) {
            // this.setState({ alert: 'Hora inválida!' });
            alert('Hora inválida!');
            return false;
        } else {
            return true;
        }

        // if (this.state.hora !== '' || this.horaFinal !== '') {
        //     this.alert = 'Hora inválida!';
        //     return false;
        // } else if (this.state.data === this.state.dataFinal &&
        //     this.state.hora > this.state.horaFinal) {
        //     this.alert = 'Hora inválida!';
        //     return false;
        // }else{
        //     return true;
        // }


    }

    verificaDate() {
        let diaIni = this.formatDate(this.state.data, 8, 10)
        let mesIni = this.formatDate(this.state.data, 5, 7)
        let anoIni = this.formatDate(this.state.data, 0, 4)
        let diaTer = this.formatDate(this.state.dataFinal, 8, 10)
        let mesTer = this.formatDate(this.state.dataFinal, 5, 7)
        let anoTer = this.formatDate(this.state.dataFinal, 0, 4)

        if (this.state.data !== '' || this.state.data.length === 10 ||
            this.state.dataFinal !== '' || this.state.dataFinal.length === 10) {
            alert('Data inválida!');
            return false;
        }
        if (anoIni < this.now.getFullYear() || anoIni > anoTer) {
            // this.setState({ alert: 'Data inválida!' });
            alert('Data inválida!');
            return false;
        } else if ((anoIni === this.now.getFullYear() && mesIni < this.now.getMonth())
            || (anoIni === anoTer && mesIni > mesTer)) {
            // this.setState({ alert: 'Data inválida!' });
            alert('Data inválida!');
            return false;
        } else if ((anoIni === this.now.getFullYear() && mesIni === this.now.getMonth() && diaIni < this.now.getDate()) || (anoIni === anoTer && mesIni === mesTer && diaIni > diaTer)) {
            // this.setState({ alert: 'Data inválida!' });
            alert('Data inválida!');
            return false;
        } else {
            return true;
        }
        // if (this.state.data !== '' || this.state.data.length === 10 ||
        //     this.state.dataFinal !== '' || this.state.dataFinal.length === 10) {
        //     this.alert = 'Data inválida!';
        //     return false;
        // }else if (this.state.data < this.now.getFullYear() || anoIni > anoTer) {
        //         // this.setState({ alert: 'Data inválida!' });
        //         this.alert = 'Data inválida!';
        //         return false;
        // }

    }

    renderiza(e) {
        if (this.state.valorIngresso) {
            return (
                <Col md={9}>
                    <Row className="text-center">
                        <Col md={12}>
                        <Label className="text-info font-weight-bold mx-2">Valor do Ingresso</Label>
                        </Col>
                    </Row>
                    <Row className="text-center" form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="valInt" className="text-info font-weight-bold mx-2">Inteira</Label>
                                <CurrencyInput className="form-control" id="valInt" value={this.state.valorIngressoInt} min={1} max={10000} required
                                    onChange={(e) => this.setState({ valorIngressoInt: e.target.value })} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="valInt" className="text-info font-weight-bold mx-2">Meia</Label>
                                <CurrencyInput className="form-control" id="valMeia" value={this.state.valorIngressoMeia} min={1} max={10000} required
                                    onChange={(e) => this.setState({ valorIngressoMeia: e.target.value })} />
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            );
        } else {
            this.state.valorIngressoInt = 0
            this.state.valorIngressoMeia = 0
        }

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
                                onChange={this.handleFile} class="btn btn-primary" />
                            {this.state.url !== '' ?
                                <img src={this.state.url} width="250" height="150" alt="Copa do post" />
                                :
                                <Progress animated color="success" value={this.state.progress} max="100" />
                            }
                            <FormText color="muted">
                                Envie uma imagem do tipo PNG ou JPEG.
                        </FormText>
                        </FormGroup>

                        <FormGroup>
                            <Label for="name">Titulo: </Label>
                            <Input id="name" type="text" value={this.state.titulo} autoFocus
                                onChange={(e) => this.setState({ titulo: e.target.value })} required />
                        </FormGroup>

                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="dateIn">Data de Início:</Label>
                                    <Input id="dateIn" type="date" value={this.state.data}
                                        onChange={(e) => this.setState({ data: e.target.value })} required />
                                </FormGroup>
                            </Col>

                            <Col md={6}>
                                <FormGroup>
                                    <Label for="dateFi">Data de Término:</Label>
                                    <Input id="dateFi" type="date" value={this.state.dataFinal}
                                        onChange={(e) => this.setState({ dataFinal: e.target.value })} required />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="hrIn">Hora de Início:</Label>
                                    <Input id="hrIn" type="time" value={this.state.hora}
                                        onChange={(e) => this.setState({ hora: e.target.value })} required />
                                </FormGroup>

                            </Col>

                            <Col md={6}>
                                <FormGroup>
                                    <Label for="hrFi">Hora do Término:</Label>
                                    <Input id="hrFi" type="time" value={this.state.horaFinal}
                                        onChange={(e) => this.setState({ horaFinal: e.target.value })} required />
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup>
                            <Label for="selectEstados">Estado:</Label>
                            <Input type="select" name="estado" id="selectEstados" value={this.state.estado}
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
                            <Label for="selectCidades">Cidade:</Label>
                            <Input type="select" name="cidade" id="selectCidades" value={this.state.cidade}
                                onChange={(e) => this.setState({ cidade: e.target.value })}>
                                {this.fillCityList()}
                                <option value=''></option>
                                {cidades.map(cidade => (
                                    <option value={cidade.nome}>
                                        {cidade.nome}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="local">Local do Evento: </Label>
                            <Input id="local" type="text" value={this.state.local}
                                onChange={(e) => this.setState({ local: e.target.value })} required />
                        </FormGroup>

                        <Row form>
                            <Col md={3}>
                                <FormGroup>
                                    <Label>Entrada:</Label>
                                    <div>
                                        <CustomInput type="radio" id="radioPaga" onClick={(e) => this.setState({ valorIngresso: true })} name="customRadio" label="Paga" />
                                        <CustomInput type="radio" id="radioGratis" onClick={(e) => this.setState({ valorIngresso: false })} name="customRadio" label="Gratuita" />
                                    </div>
                                </FormGroup>
                            </Col>
                            {this.renderiza()}
                        </Row>

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

export default withRouter(EditEvent);