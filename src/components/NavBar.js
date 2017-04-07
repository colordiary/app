import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ handleSignOut, isSignedIn }) {

    return (
        <nav className='container'>
            <ul className='twelve columns'>
                <div style={{float: 'left'}}>
                    <li className='navbar-item'><Link to='/'>home</Link></li>
                    <li className='navbar-item'><Link to='/allusers'>everybody</Link></li>
                </div>
                <div style={{float: 'right'}}>
                    {isSignedIn && (
                        <li className='navbar-item'><Link to='/user'>me</Link></li>
                    )}
                    {isSignedIn && (
                        <li className='navbar-item' onClick={handleSignOut}><Link to='/'>signout</Link></li>
                    )}
                    {!isSignedIn && (
                        <li className='navbar-item'><Link to='/signup'>signup</Link></li>
                    )}
                    {!isSignedIn && (
                        <li className='navbar-item'><Link to='/signin'>signin</Link></li>  
                    )}
                </div>
            </ul>
        </nav>
    );
}

//pass props down logout function and isSignedIn so we know which to display
//redirect sign out to home