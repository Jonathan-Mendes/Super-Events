import React, { Component } from 'react';
import firebase from '../../firebase';
import './event.css';
import { Button, Col, Row, Container } from 'reactstrap';

class Event extends Component {

    constructor(props) {
        super(props);
        this.state = {
            event: [],
            date: ''
        }
        this.formatDate = this.formatDate.bind(this);
        this.back = this.back.bind(this);
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
                local: snapshot.val().local,
                imagem: snapshot.val().imagem
            };
            this.state.date = this.state.event.data;
            this.setState(state);
        })
    }

    formatDate(data) {
        let today = data;
        var brDate = today.slice(8, 10) + '/' +
            today.slice(5, 7) + '/' +
            today.slice(0, 4);

        return brDate;
    }

    back = async () => {
        this.props.history.replace('/');
    }

    render() {
        const { titulo, autor, descricao, hora, local, imagem } = this.state.event;
        return (
            <div className="event-info">
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
                                <p>{this.formatDate(this.state.date)}</p>

                                <h2>{titulo}</h2>
                                <p>por {autor}</p>
                                <p>Local: {local}</p>
                                <p>Hora do Evento: {hora + "h"}</p>
                                <div className="bottomZero">
                                    <p>Valor do ingresso: 100R$</p>
                                    <Button className="w-100" color="success">Comprar</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className="mx-auto">
                        <Col xs='12' className="h-100 my-4 shadow p-3 mb-5 bg-white rounded">
                            <h3>Descrição</h3>
                            <p>{descricao}</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Event;