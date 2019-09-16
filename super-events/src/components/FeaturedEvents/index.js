import React, { Component } from 'react';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';
import './featuredevents.css';
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

class FeaturedEvents extends Component {

    state = {
        posts: []
    }

    componentDidMount() {
        firebase.app.ref('posts').on('value', (snapshot) => {
            let state = this.state;
            state.posts = [];

            snapshot.forEach((childItem) => {
                state.posts.push({
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
            state.posts.reverse();
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
        return (
            <div id="tip">
                <Container>
                    <Row>
                        <Col xs="12"><h5 id="title">Eventos em Destaque</h5></Col>
                    </Row>
                    <Row>
                        <Col xs='12'>
                            <section id="post">
                                {this.state.posts.slice(0, 3).map((post) => {
                                    return (
                                        <Col xs="4" key={post.key}>
                                            <Link to={`/event/${post.key}`}>
                                                <article>
                                                    <header>
                                                        <div className="title">
                                                            <strong>{post.titulo}</strong>
                                                        </div>
                                                    </header>
                                                    <img src={post.imagem} alt="Capa do post" />
                                                    <footer>
                                                        <p>{this.formatDate(post.data)}</p>
                                                        <p>{post.hora + "h"}</p>
                                                        <p>{post.local}</p>
                                                    </footer>
                                                </article>
                                            </Link>
                                        </Col>

                                    );
                                })}
                            </section>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default FeaturedEvents;