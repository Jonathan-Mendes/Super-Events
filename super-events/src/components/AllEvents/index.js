import React, { Component } from 'react';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';
import './allEvents.css';
import { FaRegClock, FaRegCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Button, Col, Row, Container } from 'reactstrap';
import { rootCertificates } from 'tls';

class AllEvents extends Component {

    state = {
        event: []
    }

    componentDidMount() {
        firebase.app.ref('events').on('value', (snapshot) => {
            let state = this.state;
            state.event = [];

            snapshot.forEach((childItem) => {
                state.event.push({
                    key: childItem.key,
                    titulo: childItem.val().titulo,
                    imagem: childItem.val().imagem,
                    descricao: childItem.val().descricao,
                    data: childItem.val().data,
                    hora: childItem.val().hora,
                    local: childItem.val().local,
                    autor: childItem.val().autor,
                })
            });
            state.event.reverse();
            this.setState(state);

        })
    }

    formatDate(data) {
        let today = data;

        var brDate = today.slice(8, 10) + '/' +
            today.slice(5, 7);
        //  + '/' + today.slice(0, 4);

        return brDate;
    }

    render() {
        return (
            <div id="tip" className="px-3">
                <Container>
                    <Row>
                        <Col xs='12'>
                            <h5 id="title" class="titleEvents">Todos os Eventos</h5>
                        </Col>
                    </Row>
                    <Container id="post">
                        <Row>
                            {this.state.event.map((post) => {
                                return (
                                    <Col xs="12" sm="4">
                                        <div id="link" key={post.key}>
                                            <Link to={`/event/${post.key}`}>
                                                <article>
                                                    <header>
                                                        <div className="title">
                                                            <strong>{post.titulo}</strong>
                                                        </div>
                                                    </header>
                                                    <img src={post.imagem} alt="Capa do post" />
                                                    <footer class="my-4">
                                                        <Row>
                                                            <Col xs='6'>

                                                                <div className="box">
                                                                    <FaRegCalendarAlt class='icon mx-2' /><p class="text">{this.formatDate(post.data)}</p></div>
                                                            </Col>

                                                            <Col xs='6'>
                                                                <div className="box">
                                                                    <FaRegClock class='icon mx-2' /><span class="text">{post.hora}</span></div>

                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs='12'>
                                                                <div>
                                                                    <p>
                                                                        <FaMapMarkerAlt className='icon mx-2' />
                                                                        {post.local}
                                                                    </p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </footer>
                                                </article>
                                            </Link>
                                        </div>
                                    </Col>
                        );
                    })}
                        </Row>
                </Container>
                </Container>
            </div >
        );
    }
}

export default AllEvents;