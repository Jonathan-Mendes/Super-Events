import React, { Component } from 'react';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';
import './allEvents.css';
import { FaRegClock, FaRegCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Button, Col, Row, Container, Input, Form } from 'reactstrap';
import { rootCertificates } from 'tls';

class AllEvents extends Component {

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
        this.verifySearch = this.verifySearch.bind(this);
        this.alert = this.alert.bind(this);
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

    verifySearch(){
        if(this.state.inputEvent.length !== 0) return true;
        if(this.state.inputDate.length !== 0)return true;
        if(this.state.inputCity.length !== 0) return true;
        return false;
    }

    alert(e){
        e.preventDefault();
        alert('Preencha ao menos um campo!');
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
                            {this.verifySearch() &&
                            <Link to={{
                                pathname: "/searchevents",
                                itemsPassed: {
                                    passedName: inputEvent,
                                    passedCity: inputCity,
                                    passedDate: inputDate
                                }
                            }}>
                                <Button className="d-flex mx-auto" id="btn" type="submit">Pesquisar</Button>
                            </Link>
                            }
                            {!this.verifySearch() &&
                            <Form onClick={this.alert}>
                                    <Button className="d-flex mx-auto" id="btn" type="submit">Pesquisar</Button>
                            </Form>
                            }
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
                                                            <strong>{post.titulo}</strong>
                                                        </div>
                                                    </header>
                                                    <img src={post.imagem} alt="Capa do post"
                                                        className='rounded' />
                                                    <footer id="dados">
                                                    <Row className='text-center'>
                                                        <Col xs='6'>
                                                            <p><span className='mx-2'><FaRegCalendarAlt className='icon' /></span>{this.formatDate(post.data)}</p>
                                                        </Col>
                                                        <Col xs='6'>
                                                            <p><span className='mx-2'><FaRegClock className='icon' /></span>{post.hora}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row >
                                                        <Col xs='12' className='ml-3'>
                                                            <p><span className='mx-2'><FaMapMarkerAlt className='icon' /></span>{post.cidade}</p>
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