import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: ''
        }
    }

    login(username, password, route) {
        return new Promise((resolve, reject) => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            };
    
            return fetch(`http://127.0.0.1:4200${ route }`, requestOptions)
                .then(handleResponse)
                .then(user => {
                    // login successful if there's a user in the response
                    if (user) {
                        // store user details and basic auth credentials in local storage 
                        // to keep user logged in between page refreshes
                        
                        if (route === '/login') {
                            user.authdata = window.btoa(username + ':' + password);
                            localStorage.setItem('user', JSON.stringify(user));
                            this.props.location.login();
                            this.props.history.push('/');
                        } else {
                            this.login(this.state.username, this.state.password, '/login').then(resolve).catch(reject);
                        }
                        console.log('yoyoyo', user);
                    }
                    // return user;
                }).catch(err => {
                    this.setState({ error: err})
                })
                
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
        });
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value, error: '' })
    }

    submitHandler = (event) => {
        if (this.determinePath() === '/signup') {
            if (this.state.username.length < 4) {
                this.setState({ error: 'Username must be at least 6 characters.'})
            } else if (this.state.password.length < 6) {
                this.setState({ error: 'Password must be at least 6 characters.'})
            } 
        } else {
            this.login(this.state.username, this.state.password, this.props.match.path)
                .then((res)=>{
                    // if (this.determinePath() === 'Signup') {
                    //     console.log('in if')
                    //     this.login(this.state.username, this.state.password, '/login');
                    // }
                    this.props.history.push('/');
                }).catch(err => {
                    console.log(err)
                });
        }

        event.preventDefault();
    }

    determinePath = () => {
        if (this.props.match.path === '/login'){
            return 'Login'
        } else {
            return 'Signup'
        }
    }

    render() {
        return (
            <div className='form-container'>
                <div className='form-wrapper'>
                    <h1>{ this.determinePath() }</h1>
                    <form onSubmit={ this.submitHandler } className='form'>
                        <p className="error">{ this.state.error }</p>
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="username" 
                            value={ this.state.username } 
                            onChange={ this.changeHandler } 
                        />
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="password" 
                            value={ this.state.password } 
                            onChange={ this.changeHandler } 
                        />
                        <button type="submit">Submit</button>
                    </form>
                    { this.determinePath() === 'Login' ? (
                        <p>
                            Don't have an account?&nbsp;
                            <Link className='register-link' to='/register' login={ this.props.location.login }>Signup</Link>
                        </p>
                    ) : (
                        <p>
                            Already have an account?&nbsp;
                            <Link className='register-link' to='/login' login={ this.props.location.login }>Login</Link>
                        </p>
                    ) }
                </div>
            </div>
        )
    }
}

// login fetch found at https://jasonwatmore.com/post/2018/09/11/react-basic-http-authentication-tutorial-example