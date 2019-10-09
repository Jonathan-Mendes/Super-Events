import React, { Component } from 'react';
import firebase from '../../firebase';
import './event.css';
import { Button, Col, Row, Container, Table } from 'reactstrap';
import { IoMdAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io"

class Event extends Component {

    constructor(props) {
        super(props);
        this.state = {
            event: [],
            date: '',
            qtd: 0,
            valorTotal: 0
        }
        this.formatDate = this.formatDate.bind(this);
        this.formatEstado = this.formatEstado.bind(this);
        this.back = this.back.bind(this);
        this.renderiza = this.renderiza.bind(this);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        firebase.app.ref('events').child(id).on('value', (snapshot) => {
            let state = this.state;
            state.event = [];

            state.event = {
                titulo: snapshot.val().titulo,
                autor: snapshot.val().autor,
                descricao: snapshot.val().descricao,
                data: snapshot.val().data,
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
            this.state.date = this.state.event.data;
            this.setState(state);
        })
    }

    formatEstado(estado) {
        let sigla
        let state = parseInt(estado)

        switch (state) {
            case 11:
                sigla = "RO"
                break
            case 12:
                sigla = "AC"
                break
            case 13:
                sigla = "AM"
                break
            case 14:
                sigla = "RR"
                break
            case 15:
                sigla = "PA"
                break
            case 16:
                sigla = "AP"
                break
            case 17:
                sigla = "TO"
                break
            case 21:
                sigla = "MA"
                break
            case 22:
                sigla = "PI"
                break
            case 23:
                sigla = "CE"
                break
            case 24:
                sigla = "RN"
                break
            case 25:
                sigla = "PB"
                break
            case 26:
                sigla = "PE"
                break
            case 27:
                sigla = "AL"
                break
            case 28:
                sigla = "SE"
                break
            case 29:
                sigla = "BA"
                break
            case 31:
                sigla = "MG"
                break
            case 32:
                sigla = "ES"
                break
            case 33:
                sigla = "RJ"
                break
            case 35:
                sigla = "SP"
                break
            case 41:
                sigla = "PR"
                break
            case 42:
                sigla = "SC"
                break
            case 43:
                sigla = "RS"
                break
            case 50:
                sigla = "MS"
                break
            case 51:
                sigla = "MT"
                break
            case 52:
                sigla = "GO"
                break
            case 53:
                sigla = "DF"
                break
        }
        return sigla;
    }

    formatDate(data, formato) {
        let today = data;
        let mes = parseInt(today.slice(5, 7));
        var brDate;

        switch (mes) {
            case 1:
                mes = 'Jan'
                break;
            case 2:
                mes = 'Fev'
                break;
            case 3:
                mes = 'Mar'
                break;
            case 4:
                mes = 'Abr'
                break;
            case 5:
                mes = 'Mai'
                break;
            case 6:
                mes = 'Jun'
                break;
            case 7:
                mes = 'Jul'
                break;
            case 8:
                mes = 'Ago'
                break;
            case 9:
                mes = 'Set'
                break;
            case 10:
                mes = 'Out'
                break;
            case 11:
                mes = 'Nov'
                break;
            case 12:
                mes = 'Dez'
                break;
            default:
                today.slice(5, 7)
        }

        if (formato) {
            brDate = mes + '/' + today.slice(0, 4);
        } else {
            brDate = today.slice(8, 10) + '/' +
                today.slice(5, 7) + '/' +
                today.slice(0, 4);
        }

        return brDate;
    }

    back = async () => {
        this.props.history.replace('/');
    }

    increment = () => {
        this.setState({
            qtd: ++this.state.qtd
        })
    }

    decrement = () => {
        if (this.state.qtd !== 0) {
            this.setState({
                qtd: --this.state.qtd
            })
        }
    }

    renderiza() {
        if (this.state.event.valorIngresso) {
            return (
                <div className="bord my-2">
                    {/*<h5 className="my-3 text-center">Valor do Ingresso</h5>
                    <p>Inteira R$ {this.state.event.valorIngressoInt},00</p>
            <p>Meia Entrada: R$ {this.state.event.valorIngressoMeia},00</p>*/}

                    <Table borderless>
                        <thead>
                            <tr>
                                <th>Entrada</th>
                                <th>Quantidade</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Inteira</td>
                                <td>
                                    <Button color="info" onClick={this.increment}><IoMdAddCircleOutline /></Button>
                                    {this.state.qtd}
                                    <Button color="info" onClick={this.decrement}><IoIosRemoveCircleOutline /></Button>
                                </td>
                                <td>R$ {this.state.event.valorIngressoInt},00</td>
                            </tr>
                            <tr>
                                <td>Meia</td>
                                <td></td>
                                <td>R$ {this.state.event.valorIngressoMeia},00</td>
                            </tr>
                            <td colSpan='2'>Total:</td>
                            <td>{this.state.valorTotal}</td>
                            <tr>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            );
        } else {
            return (
                <p color="success">Entrada Gratuita</p>
            );
        }
    }

    render() {
        const { titulo, autor, descricao, hora, horaFinal, local, cidade, estado, imagem } = this.state.event;
        return (
            <div className="my-4">
                <Container>
                    {/*<Row>
                        <Col xs="12">
                            <Button color="dark" onClick={() => this.back()}>Voltar</Button>
                        </Col>
                    </Row>*/}
                    <Row>
                        <Col xs='8'>
                            <img id="photo" className='rounded float-left mx-auto h-100 w-100 img-fluid imgCel' src={imagem} alt="Event cape" />
                        </Col>

                        <Col xs='4'>
                            <div className="h-100 shadow p-3 mb-5 bg-white rounded">
                                <p>{this.formatDate(this.state.date, true)}</p>

                                <h2>{titulo}</h2>
                                <p>por {autor}</p>
                                <p>Cidade: {cidade + " - " + this.formatEstado(estado)}</p>
                                <p>Hora do Evento: {hora}</p>
                                {this.renderiza()}
                                <Button className="w-100" color="success">Comprar</Button>

                            </div>
                        </Col>
                    </Row>

                    <Row className="mx-auto">
                        <Col xs='12' className="h-100 my-4 shadow p-3 mb-5 bg-white rounded">
                            <h4 className="text-center">Informações do Evento</h4>
                            <span className='span'>Nome do Evento: </span> {titulo} <br></br>
                            <span className='span'>Data: </span> {this.formatDate(this.state.date, false)} <br></br>
                            <span className='span'>Horário de Início: </span> {hora} <br></br>
                            <span className='span'>Horário de Término: </span> {horaFinal} <br></br>
                            <span className='span'>Produtora: </span> {autor} <br></br>
                            <span className='span'>Cidade: </span> {cidade + " - " + this.formatEstado(estado)} <br></br>
                            <span className='span'>Local: </span> {local}
                            <div className="bord my-3">
                                <p className="my-3">{descricao}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Event;