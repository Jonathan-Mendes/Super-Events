import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import firebase from './firebase';

import Header from './components/Header';
import FeaturedEvents from './components/FeaturedEvents';
import Event from './components/Event';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import NewEvent from './components/NewEvent';

import './global.css';

class App extends Component{

    state = {
        firebaseInitialized: false
    };

    componentDidMount(){
        firebase.isInitialized().then(resultado => {
            //Devolve o usuário
            this.setState({firebaseInitialized: resultado})
        })
    }

    render(){
        return this.state.firebaseInitialized !== false ? (
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route exact path="/" component={FeaturedEvents}/>
                    <Route exact path="/event/:id" component={Event}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path="/dashboard/newevent" component={NewEvent}/>
                </Switch>
            </BrowserRouter>
        ) : (
            <h1>Carregando...</h1>
        );
    }
}

export default App

