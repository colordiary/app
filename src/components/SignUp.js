import React from 'react';
import fetcher from '../helpers/fetcher';

class SignUp extends React.Component {

    doFetch(username, password, email) {
        return fetcher({
            path: '/auth/signup',
            method: 'POST',
            body: {
                username,
                password,
                email,
            },
        })
        .then(res => {
            return res.json();
        })
        .then(json => {
            if(json.error) {
                alert(json.error);
                return;
            }
            return json.token;
        });
    }


    render() {
        return (
            <div className='container'>
                <h3 style={{textAlign: 'center'}}>Welcome!</h3>
                <div className='twelve columns'>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const username = this.refs.username.value;
                    const password = this.refs.password.value;
                    const email = this.refs.email.value;
                    console.log(username, password, email);

                    this.doFetch(username, password, email)
                        .then(token => {
                            this.props.handleSignIn(token);
                            console.log(token);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    e.target.reset();
                }}>
                    <input type='text' ref='username' placeholder='username' className='four columns offset-by-four' required/>   
                    <br/>
                    <input type='email' ref='email' placeholder='email' className='four columns offset-by-four' required/>
                    <br/>
                    <input type='password' ref='password' placeholder='password' className='four columns offset-by-four' required/>
                    <br/>
                    <button type='submit' className='four columns offset-by-four button-primary'>Sign Up</button>
                </form>
                </div>
            </div>
        );
    }
}

export default SignUp;
