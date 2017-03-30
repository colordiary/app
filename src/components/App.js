import React, { Component } from 'react';
import NavBar from './NavBar';
import MainBody from './MainBody';
import Footer from './Footer';
import fetcher from '../helpers/fetcher';
import { BrowserRouter as Router, Route } from 'react-router-dom';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            token: null,
        };
        this.hydrateAuth = this.hydrateAuth.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }


    hydrateAuth() {
        const token = localStorage.getItem('token');

        if(token) {
            fetcher({
                path: '/auth/verify',
                method: 'GET',
                token: token,
            })
            .then(res => res.json())
            .then(json => {
                if(json.valid) {
                    this.setState({
                        isSignedIn: true,
                        token: token,
                    });
                }
            });
        }
    }


    handleSignIn(token) {
        localStorage.setItem('token', token);
        if(token) {
            this.setState({
                isSignedIn: true,
                token: token,
            });
        }
    }

    handleSignOut() {
        localStorage.removeItem('token');
        this.setState({
            isSignedIn: false,
            token: null,
        });
    }

    componentDidMount() {
        this.hydrateAuth();
    }
    render() {
        return (
            < Router >
                < div className='app'>
                    < Route path='/' render={props => (<NavBar {...props} isSignedIn={this.state.isSignedIn} handleSignOut={this.handleSignOut}/>)} />
                    < MainBody 
                        isSignedIn={this.state.isSignedIn} 
                        token={this.state.token} 
                        handleSignIn={this.handleSignIn}/>
                    < Route path='/' component={ Footer }/>
                </div>
            </ Router >
        );
    }
}

export default App;
