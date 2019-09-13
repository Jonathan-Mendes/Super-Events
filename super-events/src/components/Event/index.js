import React, {Component} from 'react';
import firebase from '../../firebase';
import './event.css';

class Event extends Component{

    state ={
        event: []
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        console.log(id);
        firebase.app.ref('posts').child(id).on('value', (snapshot) => {
            let state = this.state;
            state.event = [];

            state.event = {
                titulo: snapshot.val().titulo,
                autor: snapshot.val().autor,
                descricao: snapshot.val().descricao,
                imagem: snapshot.val().imagem
            };
            //state.titulo = snapshot.val().titulo;
            //state.autor = snapshot.val().autor;
            //state.descricao = snapshot.val().descricao;
            this.setState(state);
        })
 
    }

    render(){
        const {titulo, autor, descricao, imagem} = this.state.event;
        return(
            <div className="event-info">
                <article>
                    <header>
                        <div className="title">
                            <h1>{titulo}</h1>
                            <span>Autor: {autor}</span>
                        </div>
                    </header>
                    <img src={imagem} alt="Event cape"/>
                    <p>Descrição: {descricao}</p>
                </article>
            </div>
        );
    }
}

export default Event;