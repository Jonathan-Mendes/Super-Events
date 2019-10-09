import React, { Component } from 'react';
import firebase from '../../firebase';
import './event.css';
import { Button, Col, Row, Container, Table } from 'reactstrap';
import { IoMdAdd, IoIosRemove } from "react-icons/io"

class Event extends Component {

    constructor(props) {
        super(props);
        this.state = {
            event: [],
            date: '',
            qtdInteira: 0,
            qtdMeia: 0,
            qtdTotal: 0,
            valorTotal: 0
        }
        this.formatDate = this.formatDate.bind(this);
        this.formatEstado = this.formatEstado.bind(this);
        this.back = this.back.bind(this);
        this.renderiza = this.renderiza.bind(this);
        this.incrementInt = this.incrementInt.bind(this);
        this.decrementInt = this.decrementInt.bind(this);
        this.incrementMeia = this.incrementMeia.bind(this);
        this.decrementMeia = this.decrementMeia.bind(this);
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
            case 11: sigla = "RO"; break;
            case 12: sigla = "AC"; break;
            case 13: sigla = "AM"; break;
            case 14: sigla = "RR";  break;
            case 15: sigla = "PA"; break;
            case 16: sigla = "AP"; break;
            case 17: sigla = "TO"; break;
            case 21: sigla = "MA"; break;
            case 22: sigla = "PI"; break;
            case 23: sigla = "CE"; break;
            case 24: sigla = "RN"; break;
            case 25: sigla = "PB"; break;
            case 26: sigla = "PE"; break;
            case 27: sigla = "AL"; break;
            case 28: sigla = "SE"; break;
            case 29: sigla = "BA"; break;
            case 31: sigla = "MG"; break;
            case 32: sigla = "ES"; break;
            case 33: sigla = "RJ"; break;
            case 35: sigla = "SP"; break;
            case 41: sigla = "PR"; break;
            case 42: sigla = "SC"; break;
            case 43: sigla = "RS"; break;
            case 50: sigla = "MS"; break;
            case 51: sigla = "MT"; break;
            case 52: sigla = "GO"; break;
            case 53: sigla = "DF"; break;
        }
        return sigla;
    }

    formatDate(data, formato) {
        let today = data;
        let mes = parseInt(today.slice(5, 7));
        var brDate;

        switch (mes) {
            case 1: mes = 'Jan'; break;
            case 2: mes = 'Fev'; break;
            case 3: mes = 'Mar'; break;
            case 4: mes = 'Abr'; break;
            case 5: mes = 'Mai'; break;
            case 6: mes = 'Jun'; break;
            case 7: mes = 'Jul'; break;
            case 8: mes = 'Ago'; break;    
            case 9: mes = 'Set';  break;
            case 10: mes = 'Out'; break;
            case 11: mes = 'Nov'; break;
            case 12: mes = 'Dez'; break;
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

    incrementInt = () => {
        this.setState({
            qtdInteira: ++this.state.qtdInteira,
            qtdTotal: ++this.state.qtdTotal,
            valorTotal: +this.state.valorIngressoInt
        })
    }

    decrementInt = () => {
        if (this.state.qtdInteira !== 0) {
            this.setState({
                qtdInteira: --this.state.qtdInteira,
                qtdTotal: --this.state.qtdTotal,
                valorTotal: -this.state.valorIngressoInt
            })
        }
    }

    incrementMeia = () => {
        this.setState({
            qtdMeia: ++this.state.qtdMeia,
            qtdTotal: ++this.state.qtdTotal,
            valorTotal: this.state.valorTotal + this.state.valorIngressoMeia
        })
    }

    decrementMeia = () => {
        if (this.state.qtdMeia !== 0) {
            this.setState({
                qtdMeia: --this.state.qtdMeia,
                qtdTotal: --this.state.qtdTotal,
                valorTotal: this.state.valorTotal - this.state.valorIngressoMeia
            })
        }
    }

    renderiza() {
        if (this.state.event.valorIngresso) {
            return (
                <div className="bord">
                    {/*<h5 className="my-3 text-center">Valor do Ingresso</h5>
                    <p>Inteira R$ {this.state.event.valorIngressoInt},00</p>
            <p>Meia Entrada: R$ {this.state.event.valorIngressoMeia},00</p>*/}

                    <Table responsive>
                        <thead>
                            <tr>
                                <th className="text-center text-info">Entrada</th>
                                <th className="text-center text-info">Quantidade</th>
                                <th className="text-center text-info">Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center">Inteira</td>
                                <td className="text-center">
                                    <Button className="btnCompras mx-2" color="info" onClick={this.decrementInt}></Button>
                                    {this.state.qtdInteira}
                                    <Button className="btnCompras mx-2" color="info" onClick={this.incrementInt}></Button>
                                </td>
                                <td className="text-center">R$ {this.state.event.valorIngressoInt},00</td>
                            </tr>
                            <tr>
                                <td className="text-center">Meia</td>
                                <td className="text-center">
                                    <Button className="btnCompras mx-2" color="info" onClick={this.decrementMeia}>-</Button>
                                    {this.state.qtdMeia}
                                    <Button className="btnCompras mx-2" color="info" onClick={this.incrementMeia}>+</Button>
                                </td>
                                <td className="text-center">R$ {this.state.event.valorIngressoMeia},00</td>
                            </tr>
                            <tr>
                                <td className="text-center">Total</td>
                                <td className="text-center">{this.state.qtdTotal}</td>
                                <td className="text-center">R$ {this.state.valorTotal},00</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            );
        } else {
            return (
                <p className="text-success font-weight-bold">Entrada Gratuita</p>
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
                            <div className="h-100 shadow p-3 mb-2 bg-white rounded max">
                                <p className="date text-info">{this.formatDate(this.state.date, true)}</p>

                                <h2>{titulo}</h2>
                                <p className="autor">Criado por {autor}</p>
                                <p className="text-info font-weight-bold"><span className="text-dark">Cidade: </span>{cidade + " - " + this.formatEstado(estado)}</p>
                                <p className="text-info font-weight-bold"><span className="text-dark">Hora do Evento: </span>{hora}</p>
                                {this.renderiza()}
                                <Button className="w-100" color="success">Comprar</Button>

                            </div>
                        </Col>
                    </Row>

                    <Row className="mx-auto">
                        <Col xs='12' className="h-100 my-4 shadow p-3 mb-5 bg-white rounded">
                            <h4 className="text-center text-info">Informações do Evento</h4>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th className="text-center">Nome do Evento</th>
                                        <th className="text-center">Data</th>
                                        <th className="text-center">Horário de Início</th>
                                        <th className="text-center">Produtora</th>
                                        <th className="text-center">Cidade</th>
                                        <th className="text-center">Local</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-center text-info font-weight-bold">{this.formatDate(this.state.date, false)}</td>
                                        <td className="text-center text-info font-weight-bold">{hora}</td>
                                        <td className="text-center text-info font-weight-bold">{horaFinal}</td>
                                        <td className="text-center text-info font-weight-bold">{autor}</td>
                                        <td className="text-center text-info font-weight-bold">{cidade + " - " + this.formatEstado(estado)}</td>
                                        <td className="text-center text-info font-weight-bold">{local}</td>
                                    </tr>
                                </tbody>
                            </Table>


                            <div className="bord my-3">
                                <p className="my-3 descricao">{descricao}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Event;