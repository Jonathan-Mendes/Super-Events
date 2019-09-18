import React, { Component } from 'react';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';
import './featuredevents.css';
import { FaRegClock, FaRegCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Container, Row, Col, Button } from 'reactstrap';

class FeaturedEvents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
        this.formatDate = this.formatDate.bind(this);
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
            today.slice(5, 7);
        //  + '/' + today.slice(0, 4);

        return brDate;
    }

    verTodos = async () => {
        this.props.history.replace('/allevents');
    }

    render() {
        return (
            <div id="tip">
                <Container>
                    <Row>
                        <h5 id="title">Eventos em Destaque</h5>
                    </Row>
                    <Container id="post">
                        <Row>
                            {this.state.posts.slice(0, 3).map((post) => {
                                return (

                                    <Col xs="4">
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
                                                                    <FaRegClock class='icon mx-2' /><p class="text">{post.hora}</p></div>

                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs='12'>
                                                                <div className="box">
                                                                    <FaMapMarkerAlt class='icon mx-2' /><p class="text">{post.local}</p>
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
                    <Row>
                        <Col xs='12'>
                            <Button color='info' onClick={() => this.verTodos()}>VER TODOS</Button>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <h5 id="title">Próximos Eventos</h5>
                    </Row>
                    <Container id="post">
                        <Row>
                            {this.state.posts.slice(0, 3).map((post) => {
                                return (

                                    <Col xs="4">
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
                                                                    <FaRegClock class='icon mx-2' /><p class="text">{post.hora}</p></div>

                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs='12'>
                                                                <div className="box">
                                                                    <FaMapMarkerAlt class='icon mx-2' /><p class="text">{post.local}</p>
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

                <Container>
                    <Row>
                        <h5 id="title">Últimos Adicionados</h5>
                    </Row>
                    <Container id="post">
                        <Row>
                            {this.state.posts.slice(0, 3).map((post) => {
                                return (

                                    <Col xs="4">
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
                                                                    <FaRegClock class='icon mx-2' /><p class="text">{post.hora}</p></div>

                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs='12'>
                                                                <div className="box">
                                                                    <FaMapMarkerAlt class='icon mx-2' /><p class="text">{post.local}</p>
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
            </div>
        );
    }
}

export default FeaturedEvents;