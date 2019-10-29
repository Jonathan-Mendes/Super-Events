import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './dashboard.css';
import { IoIosLogOut, IoIosAdd } from 'react-icons/io';
import { Button, Col, Row, Container } from 'reactstrap';
import { FaRegClock, FaRegCalendarAlt, FaMapMarkerAlt, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { async } from 'q';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: localStorage.nome,
            uid: firebase.getCurrentUid(),
            events: [],
            ativo: '',
            var: []
        };
        this.logout = this.logout.bind(this);
        this.newEvent = this.newEvent.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    async componentDidMount() {
        if (!firebase.getCurrent()) {
            this.props.history.replace('/login');
            return null;
        }

        firebase.getUserName((info) => {
            localStorage.nome = info.val().nome
            this.setState({ nome: localStorage.nome })
        })

        firebase.app.ref('events').orderByChild("uid").equalTo(this.state.uid).on('value', (snapshot) => {
            let state = this.state;
            state.events = [];

            snapshot.forEach((childItem) => {
                state.events.push({
                    key: childItem.key,
                    titulo: childItem.val().titulo,
                    imagem: childItem.val().imagem,
                    descricao: childItem.val().descricao,
                    data: childItem.val().data,
                    hora: childItem.val().hora,
                    cidade: childItem.val().cidade,
                    local: childItem.val().local,
                    autor: childItem.val().autor,
                    ativo: childItem.val().ativo
                })
            })
            this.setState(state);
        })
    }

    logout = async () => {
        await firebase.logout()
            .catch((error) => {
                console.log(error);
            });
        localStorage.removeItem("nome");
        this.props.history.push('/');
    }

    newEvent = async () => {
        this.props.history.replace('/dashboard/newevents');
    }

    formatDate(data) {
        let today = data;

        var brDate = today.slice(8, 10) + '/' +
            today.slice(5, 7);

        return brDate;
    }

    deleteEvent = async (key) => {
        try {
            await firebase.deleteEventByKey(key);
            window.location.reload();

        } catch (error) {
            alert(error.message);
        }
    }

    render() {
        return (
            <div id="dashboard" className="px-3 my-3">
                <Container>
                    <div className="user-info">
                        <h5>Olá, {this.state.nome}</h5>
                    </div>
                    <p>Logado com {firebase.getCurrent()}</p>

                    <div id="tip">
                        <Row>
                            <Col xs='12'>
                                <h5 id="title">Meus Eventos</h5>
                            </Col>
                        </Row>
                        <Container id="post" class="container">
                            <Row>
                                {this.state.events.map((post) => {
                                    return (
                                        <Col xs='12' sm='4'>
                                            <div id="link" key={post.key}>
                                                <Link to={`/event/${post.key}`}>
                                                    <article>
                                                        <header>
                                                            <div className="title">
                                                                <strong>{post.titulo}</strong>
                                                            </div>
                                                        </header>
                                                        <img src={post.imagem} alt="Capa do post" />
                                                        <footer class="my-2">
                                                            <Row className='text-center'>
                                                                <Col xs='6'>
                                                                    <p><span className='mx-2'><FaRegCalendarAlt className='icon' /></span>{this.formatDate(post.data)}</p>
                                                                </Col>

                                                                <Col xs='6'>
                                                                    <p><span className='mx-2'><FaRegClock className='icon' /></span>{post.hora}</p>

                                                                </Col>
                                                            </Row>
                                                            <Row >
                                                                <Col xs='12' className='ml-4'>
                                                                    <p>
                                                                        <span className='mx-2'><FaMapMarkerAlt className='icon' /></span>
                                                                        {post.cidade}
                                                                    </p>
                                                                </Col>
                                                            </Row>
                                                        </footer>
                                                    </article>

                                                </Link>
                                                <Row>
                                                    <Col xs='6'>
                                                        <Link to={`/editevent/${post.key}`}>
                                                            <Button id="btnEdit" color="success">
                                                                <FaRegEdit />
                                                            </Button>
                                                        </Link>
                                                    </Col>
                                                    <Col xs='6'>
                                                        <Button id="btnDelete" color="danger"
                                                            onClick={() => this.deleteEvent(post.key)}>
                                                            <FaRegTrashAlt />
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Container>
                    </div>

                </Container>
            </div>
        );
    }
}

export default withRouter(Dashboard);