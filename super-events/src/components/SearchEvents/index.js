import React, { Component } from 'react';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';
import './searchevents.css';
import { FaRegClock, FaRegCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Container, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';

class SearchEvents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputEvento: '',
            inputCidade: '',
            inputData: '',
            passedEvents: [],
            eventSearch: [],
            verify: false
        }
        this.formatDate = this.formatDate.bind(this);
        this.pesquisar = this.pesquisar.bind(this);
    }


    componentDidMount() {
        this.state.passedEvents = this.props.location.itemsPassed;

        if(this.state.passedEvents.passedName.length === 0 && this.state.passedEvents.passedCity.length === 0 && this.state.passedEvents.passedDate.length === 0){
            this.setState({verify: false});
        }else

        if(this.state.passedEvents.passedName.length !== 0){
            
            firebase.app.ref('events').orderByChild("tituloLower").equalTo(this.state.passedEvents.passedName.toLowerCase()).on('value', (snapshot) => {

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
                this.setState({verify: true});
            })

        }else

        if(this.state.passedEvents.passedCity.length !== 0){
            
            firebase.app.ref('events').orderByChild("cidadeLower").equalTo(this.state.passedEvents.passedCity.toLowerCase()).on('value', (snapshot) => {

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
                this.setState({verify: true});
            })

        }else

        if(this.state.passedEvents.passedDate.length !== 0){
            firebase.app.ref('events').orderByChild("data").equalTo(this.state.passedEvents.passedDate).on('value', (snapshot) => {

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
                this.setState({verify: true});
            })

        }else

        if(this.state.passedEvents.passedName.length !== 0 && this.state.passedEvents.passedCity.length !== 0){

            firebase.app.ref('events').orderByChild("titulo_cidade").equalTo(this.state.passedEvents.passedName.toLowerCase() + '_' + this.state.passedEvents.passedCity.toLowerCase()).on('value', (snapshot) => {

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
                this.setState({verify: true});
            })
        }else

        if(this.state.passedEvents.passedCity.length !== 0 && this.state.passedEvents.passedDate.length !== 0){

            firebase.app.ref('events').orderByChild("cidade_data").equalTo(this.state.passedEvents.passedCity.toLowerCase() + '_' + this.state.passedEvents.passedDate).on('value', (snapshot) => {

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
                this.setState({verify: true});
            })
        }else

        if(this.state.passedEvents.passedName.length !== 0 && this.state.passedEvents.passedDate.length !== 0){

            firebase.app.ref('events').orderByChild("titulo_data").equalTo(this.state.passedEvents.passedName.toLowerCase() + '_' + this.state.passedEvents.passedDate).on('value', (snapshot) => {

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
                this.setState({verify: true});
            })
        }
        
    }

    formatDate(data) {
        let today = data;

        var brDate = today.slice(8, 10) + '/' +
            today.slice(5, 7);
        //  + '/' + today.slice(0, 4);

        return brDate;
    }

    pesquisar = async () => {
        const {inputEvento, inputCidade, inputData, returnedEvents} = this.state;
        try {
            returnedEvents = firebase.searchEvents(inputEvento);
            console.log(returnedEvents);
        } catch(error) {
            alert(error.message);
        }
    }

    render() {
        const {verify} = this.state;

        // if(verify){
            return (
                <div id="tip" className="px-3">
                    {/* <Container id="search">
                        <Form onSubmit={this.pesquisar}>
                            <FormGroup>
                                <Row id="specific">
                                    <Col xs="3"><Input id="eventName" type="text" placeholder="Buscar por Eventos" 
                                        onChange={(e) => this.setState({ inputEvento: e.target.value })}/>
                                    </Col>
                                    <Col xs="3"><Input id="cityName" type="text" placeholder="Buscar por Cidades"
                                        onChange={(e) => this.setState({ inputCidade: e.target.value })}/>
                                    </Col>
                                    <Col xs="3"><Input id="eventDate" type="date" placeholder="Buscar por Datas"
                                        onChange={(e) => this.setState({ inputData: e.target.value })}/>
                                    </Col>
                                    <Col xs="3"><Button color="primary" type="submit">Pesquisar</Button>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Form>
                    </Container> */}

                    

                    <Container>
                        <Container id="post">
                            <Row>
                                {this.state.eventSearch.map((post) => {
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
                                    //}
                                })}
                            </Row>
                        </Container>
                    </Container>
                    
                </div>
            )
        // }
    }
}

export default SearchEvents;