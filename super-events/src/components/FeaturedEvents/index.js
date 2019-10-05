import React, { Component } from 'react';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';
import './featuredevents.css';
import { FaRegClock, FaRegCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Container, Row, Col, Button } from 'reactstrap';
import { DH_CHECK_P_NOT_SAFE_PRIME } from 'constants';

class FeaturedEvents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            event: []
        }
        this.formatDate = this.formatDate.bind(this);
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
                    cidade: childItem.val().cidade,
                    autor: childItem.val().autor,
                    ativo: childItem.val().ativo
                });
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

    verTodos = async () => {
        this.props.history.replace('/allevents');
    }

    render() {
        return (
            <div id="tip" className="px-3">
                <Container>
                    <Row>
                        <h5 id="title" className="titleEvents">Eventos em Destaque</h5>
                    </Row>
                    <Container id="post">
                        <Row>
                            {this.state.event.slice(0, 3).map((post) => {
                                //if (post.ativo) {
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
                                                        <img src={post.imagem} alt="Capa do post"
                                                            className='rounded' />
                                                        <footer className="my-4">
                                                            <Row>
                                                                <Col xs='6'>

                                                                    <div className="box">
                                                                        <FaRegCalendarAlt className='icon' /><p className="text">{this.formatDate(post.data)}</p></div>
                                                                </Col>

                                                                <Col xs='6'>
                                                                    <div className="box">
                                                                        <FaRegClock className='icon' /><p className="text">{post.hora}</p></div>

                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xs='12'>
                                                                    <div>
                                                                        <p>
                                                                            <FaMapMarkerAlt className='icon mx-2' />
                                                                            {post.cidade}
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
                                //}
                            })}
                        </Row>
                    </Container>
                    <Row>
                        <Col xs='12' className="my-3">
                            <Button className="verTodos d-flex mx-auto" color='info' onClick={() => this.verTodos()}>VER TODOS</Button>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <h5 id="title" className="titleEvents">Próximos Eventos</h5>
                    </Row>
                    <Container id="post" className="px-2">
                        <Row>
                            {this.state.event.slice(0, 3).map((post) => {
                                return (

                                    <Col xs="12" sm='4'>
                                        <div id="link" key={post.key}>
                                            <Link to={`/event/${post.key}`}>
                                                <article>
                                                    <header>
                                                        <div className="title">
                                                            <strong>{post.titulo}</strong>
                                                        </div>
                                                    </header>
                                                    <img src={post.imagem} alt="Capa do post"
                                                        className='rounded' />
                                                    <footer className="my-4">
                                                        <Row>
                                                            <Col xs='6'>

                                                                <div className="box">
                                                                    <FaRegCalendarAlt className='icon mx-2' /><p className="text">{this.formatDate(post.data)}</p></div>
                                                            </Col>

                                                            <Col xs='6'>
                                                                <div className="box">
                                                                    <FaRegClock className='icon mx-2' /><p className="text">{post.hora}</p></div>

                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs='12'>
                                                                <div>
                                                                    <p>
                                                                        <FaMapMarkerAlt className='icon mx-2' />
                                                                        {post.cidade}
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
                    <Row>
                        <Col xs='12' className="my-3">
                            <Button className="verTodos d-flex mx-auto" color='info' onClick={() => this.verTodos()}>VER TODOS</Button>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <h5 id="title" className="titleEvents">Últimos Adicionados</h5>
                    </Row>
                    <Container id="post" className="px-2">
                        <Row>
                            {this.state.event.slice(0, 3).map((post) => {
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
                                                    <img src={post.imagem} alt="Capa do post"
                                                        className='rounded' />
                                                    <footer className="my-4">
                                                        <Row>
                                                            <Col xs='6'>

                                                                <div className="box">
                                                                    <FaRegCalendarAlt className='icon mx-2' /><p className="text">{this.formatDate(post.data)}</p></div>
                                                            </Col>

                                                            <Col xs='6'>
                                                                <div className="box">
                                                                    <FaRegClock className='icon mx-2' /><p className="text">{post.hora}</p></div>

                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs='12'>
                                                                <div>
                                                                    <p>
                                                                        <FaMapMarkerAlt className='icon mx-2' />
                                                                        {post.cidade}
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
                    <Row>
                        <Col xs='12' className="my-3">
                            <Button className="verTodos d-flex mx-auto" color='info' onClick={() => this.verTodos()}>VER TODOS</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default FeaturedEvents;