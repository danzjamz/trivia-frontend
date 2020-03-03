import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'username': '',
            'password': '',
            'error': ''
        }
    }

    login(username, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };
    
        return fetch('http://127.0.0.1:4200/login', requestOptions)
            .then(handleResponse)
            .then(user => {
                // login successful if there's a user in the response
                if (user) {
                    // store user details and basic auth credentials in local storage 
                    // to keep user logged in between page refreshes
                    user.authdata = window.btoa(username + ':' + password);
                    localStorage.setItem('user', JSON.stringify(user));

                    this.setState({ error: '' });
                    // this.props.onLogin(user);

                    console.log('yoyoyo', user)
                }
                return user;
            }).catch(err => {
                this.setState({ error: err})
            });

        function handleResponse(response) {
            return response.text().then(text => {
                const data = text && JSON.parse(text);
                if (!response.ok) {
                    if (response.status === 401) {
                        // auto logout if 401 response returned from api
                        logout();
                        // location.reload(true);
                    }
        
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
        
                return data;
            });
        }

        function logout() {
            // remove user from local storage to log user out
            localStorage.removeItem('user');
        }
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    submitHandler = (event) => {
        this.login(this.state.username, this.state.password);
        event.preventDefault();
    }

    render() {
        return (
            <div className='form-container'>
                <div className='form-wrapper'>
                    <h1>Login</h1>
                    <form onSubmit={ this.submitHandler } className='form'>
                        <p className="error">{ this.state.error }</p>
                        <input type="text" name="username" placeholder="username" value={ this.state.username } onChange={ this.changeHandler } />
                        <input type="password" name="password" placeholder="password" value={ this.state.password } onChange={ this.changeHandler } />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

// login fetch found at https://jasonwatmore.com/post/2018/09/11/react-basic-http-authentication-tutorial-example