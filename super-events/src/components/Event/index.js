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
    }



    componentDidMount() {
        const { id } = this.props.match.params;
        firebase.app.ref('posts').child(id).on('value', (snapshot) => {
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
        const { titulo, autor, descricao, data, hora, local, imagem } = this.state.event;
        return (
            <div className="event-info">
                <Container>
                    <Row>
                        <Col xs="12">
                            <Button color="dark" onClick={() => this.back()}>Voltar</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <div className="title">
                                <h1>{titulo}</h1>
                                <span>Autor: {autor}</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                    <Col>
                    <img id="photo" src={imagem} alt="Event cape" />
                    </Col>
                    </Row>
                    
                    <Row>
                    <Col xs='12'>
                    <p>Descrição: {descricao}</p>
                    <p>Local: {local}</p>
                    <p>Hora do Evento: {hora + "h"}</p>
                    <p>Data do Evento: {this.formatDate(this.state.date)}</p>
                    <Button color="success">Comprar</Button>
                    </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Event;