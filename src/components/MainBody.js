import React from 'react';
import HomePage from './HomePage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UserMain from './UserMain';
import AllUsers from './AllUsers';
import { Route, Redirect } from 'react-router-dom';

export default function MainBody({ handleSignIn, isSignedIn, token }) {
    return (
        <main>
            < Route exact path='/' component={ HomePage } />
            < Route path='/signup' render={props => (<SignUp {...props} handleSignIn={handleSignIn}/>)} />
            < Route path='/signin' render={props => (<SignIn {...props} isSignedin={isSignedIn} handleSignIn={handleSignIn}/>)}/>
            < Route path='/user' render={props => (
                isSignedIn ? (<UserMain {...props} isSignedIn={isSignedIn} token={token}/>) 
                : (<Redirect to={{  pathname:'/signin', state: { from: props.location }}}/>))}/>
            < Route path='/allusers' component={ AllUsers } />
        </main>
    );
}
