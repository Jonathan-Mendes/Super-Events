import React, { Component } from 'react';
import firebase from '../../firebase';
import './event.css';
import { Button } from 'reactstrap';

class Event extends Component {

    constructor(props){
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

    render() {
        const { titulo, autor, descricao, data, hora, local, imagem } = this.state.event;
        return (
            <div className="event-info">
                <article>
                    <header>
                        <div className="title">
                            <h1>{titulo}</h1>
                            <span>Autor: {autor}</span>
                        </div>
                    </header>
                    <img id="test" src={imagem} alt="Event cape" />
                    <p>Descrição: {descricao}</p>
                    <p>Local: {local}</p>
                    <p>Hora do Evento: {hora + "h"}</p>
                    <p>Data do Evento: {this.formatDate(this.state.date)}</p>
                    <Button color="success">Comprar</Button>
                </article>
            </div>
        );
    }
}

export default Event;