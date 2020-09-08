import React, { Component } from 'react';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';
import './allEventsDestaque.css';
import { FaRegClock, FaRegCalendarAlt, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { Button, Col, Row, Container, Input } from 'reactstrap';
import { rootCertificates } from 'tls';

class AllEventsDestaque extends Component {

    constructor(props) {
        super(props);
        this.state = {
            event: [],
            inputEvent: '',
            inputCity: '',
            inputDate: '',
            verify: false,
            eventSearch: []
        }
        this.formatDate = this.formatDate.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
    }

    componentDidMount() {
        firebase.app.ref('events').orderByChild("destacado").equalTo(true).on('value', (snapshot) => {
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
                    autor: childItem.val().autor
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

        return brDate;
    }

    searchEvent() {
        const { inputEvent, inputCity, inputDate, all } = this.state;
        //console.log(inputEvent);
        if (inputEvent.length !== 0) {

            //this.state.all = firebase.searchEvents(this.state.inputEvent);
            //console.log(this.state.all);

            firebase.app.ref('events').orderByChild("titulo").equalTo(inputEvent[0].toUpperCase() + inputEvent.substr(1)).on('value', (snapshot) => {
                let state = this.state;
                state.eventSearch = [];

                snapshot.forEach((childItem) => {
                    state.eventSearch.push({
                        key: childItem.key,
                        titulo: childItem.val().titulo,
                        imagem: childItem.val().imagem,
                        descricao: childItem.val().descricao,
                        data: childItem.val().data,
                        hora: childItem.val().hora,
                        local: childItem.val().local,
                        cidade: childItem.val().cidade,
                        ativo: childItem.val().ativo
                    });
                });
                this.setState(state);
                this.setState({ verify: true });
            })
        }
    }
    render() {
        const {inputEvent, inputCity, inputDate} = this.state;
        
        return (
            
            <div id="tip" className="px-3">
                <Container id="search">
                    {/* <Form onSubmit={this.pesquisar}> */}
                    {/* <FormGroup> */}
                    <Row id="specific" className=''>
                        <Col xs='12' md='3' className='my-1'><Input id="eventName" type="text" placeholder="Buscar por Eventos"
                            onChange={(e) => this.setState({ inputEvent: e.target.value })} />
                        </Col>
                        <Col xs='12' md='3' className='my-1'><Input id="cityName" type="text" placeholder="Buscar por Cidades"
                            onChange={(e) => this.setState({ inputCity: e.target.value })} />
                        </Col>
                        <Col xs='12' md='3' className='my-1'><Input id="eventDate" type="date" placeholder="Buscar por Datas"
                            onChange={(e) => this.setState({ inputDate: e.target.value })} />
                        </Col>
                        <Col xs='12' md='3' className='my-1'>
                            <Link to={{
                                pathname: "/searchevents",
                                itemsPassed: {
                                    passedName: inputEvent,
                                    passedCity: inputCity,
                                    passedDate: inputDate
                                }
                            }}>
                                <Button className='w-100' color="primary" type="submit" onClick={() => this.searchEvent()}>Pesquisar</Button>
                            </Link>
                        </Col>
                    </Row>
                    {/* </FormGroup> */}
                    {/* </Form> */}
                </Container>
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
                                                            <strong>
                                                            {post.titulo} 
                                                            </strong>

                                                            <FaStar className="text-warning icon star" />
                                                        </div>
                                                    </header>
                                                    <img src={post.imagem} alt="Capa do post"
                                                        className='rounded' />
                                                    <footer className="my-4">
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

export default AllEventsDestaque;