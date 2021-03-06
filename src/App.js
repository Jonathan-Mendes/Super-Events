import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import firebase from './firebase';
import Header from './components/Header';
import FeaturedEvents from './components/FeaturedEvents';
import AllEvents from './components/AllEvents';
import AllEventsDestaque from './components/AllEventsDestaque';
import Event from './components/Event';
import EditEvent from './components/EditEvent';
import SearchEvents from './components/SearchEvents';
import Login from './components/Login';
import Perfil from './components/Perfil'
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import NewEvents from './components/NewEvents';
import { Spinner, Container } from 'reactstrap'
import './global.css';

class App extends Component {

    state = {
        firebaseInitialized: false
    };

    componentDidMount() {
        firebase.isInitialized().then(resultado => {
            //Devolve o usuário
            this.setState({ firebaseInitialized: resultado })
        })
    }

    render() {
        return this.state.firebaseInitialized !== false ? (
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path="/" component={FeaturedEvents} />
                    <Route exact path="/allevents" component={AllEvents} />
                    <Route exact path="/alleventsdestaque" component={AllEventsDestaque} />
                    <Route exact path="/event/:id" component={Event} />
                    <Route exact path="/editevent/:id" component={EditEvent} />
                    <Route exact path="/searchevents" component={SearchEvents} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/dashboard/newevents" component={NewEvents} />
                    <Route exact path="/perfil" component={Perfil} />
                </Switch>
            </BrowserRouter>
        ) : (
                <div id="spinner">
                    <Spinner style={{ width: '6rem', height: '6rem' }} color="dark" />
                </div>
            );
    }
}

export default App