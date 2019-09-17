import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './dashboard.css';
import { IoIosLogOut, IoIosAdd } from 'react-icons/io';
import { Button } from 'reactstrap';

class Dashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            nome: localStorage.nome
        };
        this.logout = this.logout.bind(this);
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
        this.props.history.replace('/dashboard/newevent');
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
            </div>
        );
    }
}

export default withRouter(Dashboard);