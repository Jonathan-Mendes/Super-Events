import React, { Component } from 'react';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';
import './featuredevents.css';
import { FaRegClock, FaRegCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Container, Row, Col, Button, Form, Input } from 'reactstrap';

class FeaturedEvents extends Component {

    date = new Date;

    constructor(props) {
        super(props);
        this.state = {
            event: [],
            inputEvent: '',
            inputCity: '',
            inputDate: '',
            verify: false,
            eventSearch: [],
            dia: this.date.getDate(),
            mes: this.date.getMonth() + 1,
            ano: this.date.getFullYear()
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
                    autor: childItem.val().autor,
                    destacado: childItem.val().destacado
                });
            });
            state.event.reverse();
            this.setState(state);
        })

        this.eventosEmDestaque();
    }

    formatDate(data) {
        let today = data;

        var brDate = today.slice(8, 10) + '/' +
            today.slice(5, 7);

        return brDate;
    }

    eventosEmDestaque(){
        firebase.app.ref('events').orderByChild("destacado").equalTo(true).on('value', (snapshot) =>{
            let state = this.state;
            state.eventosDestaque = [];

            snapshot.forEach((childItem) => {
                state.eventosDestaque.push({
                    key: childItem.key,
                    titulo: childItem.val().titulo,
                    imagem: childItem.val().imagem,
                    descricao: childItem.val().descricao,
                    data: childItem.val().data,
                    hora: childItem.val().hora,
                    local: childItem.val().local,
                    cidade: childItem.val().cidade,
                    autor: childItem.val().autor,
                    destacado: childItem.val().destacado
                });
            });
            // state.eventosDestaque.reverse();
            this.setState(state);

        })
        
    }

    verTodos(){
        this.props.history.replace('/allevents');
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
        const {inputEvent, inputCity, inputDate, dia, mes, ano} = this.state;

            return (
                <div id="tip" className="px-3">
                    <Container id="search">
                        <Row id="specific" className=''>
                            <Col xs='12' md='3' className='my-1'><Input id="eventName" type="text" placeholder="Buscar por Eventos"
                                onChange={(e) => this.setState({ inputEvent: e.target.value })}/>
                            </Col>
                            <Col xs='12' md='3' className='my-1'><Input id="cityName" type="text" placeholder="Buscar por Cidades"
                                onChange={(e) => this.setState({ inputCity: e.target.value })}/>
                            </Col>
                            <Col xs='12' md='3' className='my-1'><Input id="eventDate" type="date" placeholder="Buscar por Datas"
                                onChange={(e) => this.setState({ inputDate: e.target.value })}/>
                            </Col>
                            <Col  xs='12' md='3' className='my-1'>
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
                    </Container>
                    <Container>
                        <Row>
                            <h5 id="title" className="titleEvents">Eventos em Destaque</h5>
                        </Row>
                        <Container id="post">
                            <Row>
                                {this.state.event.slice(0, 3).map((post) => {
                                    //if (post.data.slice(8, 10) >= dia && post.data.slice(5, 7) >= mes && post.data.slice(0, 4) >= ano) {
                                        return (
                                            <Col xs="12" sm="4">
                                                <div id="link" className="main" key={post.key}>
                                                    <div className="item">
                                                    <Link to={`/event/${post.key}`}>
                                                        <article>
                                                            <header>
                                                                <div className="title">
                                                                    <strong>{post.titulo}</strong>
                                                                </div>
                                                            </header>
                                                            <img src={post.imagem} alt="Capa do post" className='rounded'/>
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
                                                                    <Col xs='12' className='ml-3' id="city">
                                                                        <p><span className='mx-2'><FaMapMarkerAlt className='icon' /></span>{post.cidade}</p>
                                                                    </Col>
                                                                </Row>
                                                            </footer>
                                                        </article>
                                                    </Link>
                                                    </div>
                                                </div>
                                            </Col>
                                        );
                                    //}
                                })}
                            </Row>
                        </Container>
                        <Row>
                            <Col xs='12' className="my-3">
                                <Button className="verTodos d-flex mx-auto" onClick={() => this.verTodos()}>VER TODOS</Button>
                            </Col>
                        </Row>
                    </Container>
    
                    <Container>
                        <Row>
                            <h5 id="title" className="titleEvents">Próximos Eventos</h5>
                        </Row>
                        <Container id="post">
                            <Row>
                                {this.state.event.slice(0, 3).map((post) => {
                                    if (post.data.slice(8, 10) >= dia && post.data.slice(5, 7) >= mes && post.data.slice(0, 4) >= ano) {
                                        return (
                                            <Col xs="12" sm='4'>
                                                <div id="link" className="main" key={post.key}>
                                                    <div className="item">
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
                                                </div>
                                            </Col>
                                        );
                                    }
                                })}
                            </Row>
                        </Container>
                        <Row>
                            <Col xs='12' className="my-3">
                                <Button className="verTodos d-flex mx-auto" color='info' onClick={() => this.verTodos()}>VER TODOS EVENTOS</Button>
                            </Col>
                        </Row>
                    </Container>
    
                    <Container>
                        <Row>
                            <h5 id="title" className="titleEvents">Últimos Adicionados</h5>
                        </Row>
                        <Container id="post">
                            <Row>
                                {this.state.event.slice(0, 3).map((post) => {
                                    return (
                                        <Col xs="12" sm="4">
                                            <div id="link" className="main" key={post.key}>
                                                <div className="item">
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
                                            </div>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Container>
                        <Row>
                            <Col xs='12' className="my-3">
                                <Button className="verTodos d-flex mx-auto" color='info' onClick={() => this.verTodos()}>VER TODOS EVENTOS</Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        }
}

export default FeaturedEvents;