import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './dashboard.css';
import { IoIosLogOut, IoIosAdd } from 'react-icons/io';
import { Button } from 'reactstrap';
import { FaRegClock, FaRegCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

class Dashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            nome: localStorage.nome,
            uid: firebase.getCurrentUid(),
            events: []
        };
        this.logout = this.logout.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    async componentDidMount(){
        if(!firebase.getCurrent()){
            this.props.history.replace('/login');
            return null;
        }

        firebase.getUserName((info) => {
            localStorage.nome = info.val().nome
            this.setState({nome: localStorage.nome})
        })

        firebase.app.ref('events').child(this.state.uid).on('value', (snapshot) => {
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
                    local: childItem.val().local,
                    autor: childItem.val().autor,
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
                     today.slice(5, 7) + '/' + 
                     today.slice(0, 4);

        return brDate;
    }

    render(){
        return(
            <div id="dashboard">
                <div className="user-info">
                    <h5>Olá, {this.state.nome}</h5>
                </div>
                <p>Logado com {firebase.getCurrent()}</p>
                <Button color="success" onClick={() => this.newEvent()}>
                <span class="icon"><IoIosAdd/></span> Novo Post</Button>
                <Button color="danger" onClick={() => this.logout()}>
                <span class="icon"><IoIosLogOut/></span> Sair</Button>

                <div id="tip">
                    <div>
                        <h3>Meus Eventos</h3>
                    </div>
                    <section id="post">
                        {this.state.events.map((post) => {
                            return(
                                <div class="col-4" key={post.key}>
                                    <Link to={`/event/${post.key}`}>
                                    <article>
                                        <header>
                                            <div className="title">
                                                <strong>{post.titulo}</strong>
                                            </div>
                                        </header>
                                        <img src={post.imagem} alt="Capa do post"/>
                                        <footer class="my-4">
                                            <div className="fix">
                                                <div className="box">
                                                <FaRegCalendarAlt class='icon mx-2'/><p>{this.formatDate(post.data)}</p></div>
                                                <div className="box">
                                                <FaRegClock class='icon mx-2'/><p>{post.hora}</p></div>
                                            </div>
                                            <div className="fix">
                                            <FaMapMarkerAlt class='icon mx-2'/><p>{post.local}</p></div>
                                        </footer>
                                    </article>
                                    </Link>
                                </div>
                            );
                        })}
                    </section>
                </div>
            </div>

            
        );
    }
}

export default withRouter(Dashboard);