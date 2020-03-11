import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';


export default class NewTrivia extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trivia: {
                user_id: 1,
                title: '',
                description: '',
                questions: '',
                is_open: false,
                should_wait: false
            },
            user: this.getUser()
        }
    }

    handleChange = (event) => {
        this.setState({ 
           trivia: { ...this.state.trivia, [event.target.name]: event.target.value }
        });
    }

    handleCheck = (event) => {
        this.setState({ 
            trivia: { ...this.state.trivia, [event.target.name]: event.target.checked } 
        });
    }

    getUser = () => {
        // get user from local storage
        if (localStorage.user == undefined) {
            return null;
        } else {
            return localStorage.user;
        }
    }

    checkUser = () => {
        if (this.state.user) {
            const token = jwt.decode(JSON.parse(this.state.user).access_token);
            
            // console.log(jwt.verify(token, 'supersecret'))
    
            if (token.exp * 1000 < Date.now()) {
                localStorage.clear();
                return false;
            }
            
            return true;
        }
        return false;
    }

    postNewTrivia = () => {
        if (this.checkUser()) {
            const token = JSON.parse(this.state.user).access_token;
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                mode: 'cors',
                body: JSON.stringify(this.state.trivia)
            };
    
            fetch('http://127.0.0.1:4200/trivia', requestOptions)
                .then(res => {
                    console.log(res); 
                    return res.json();
                }).then(data => {
                    if (data) {
                        this.props.history.push('/new-trivia/questions', { trivia_id: data.id });
                    } else {
                        return 'BAD REQUEST';
                    }
                }).catch(err => {
                    console.log('Post New Trivia error ->', err)
                });
        } else {
            console.log('User not logged in!')
        }
    }

    submitForm = (event) => {
        this.postNewTrivia();
        event.preventDefault();
    }

    render() {
        return (
            <div className='new-trivia-container'>
                <h1 className='new-trivia-title'>New Trivia</h1>
                <div className='new-trivia-wrapper'>
                    <form onSubmit={ this.submitForm }>
                    {/* <form> */}
                        <div>
                            <label>Title</label>
                            <input className='form-el' type="text" name="title" placeholder="title" onChange={ () => this.handleChange(event) }></input>
                            <label>Description</label>
                            <textarea className='form-el' type="text" name="description" placeholder="description" rows='10' onChange={ () => this.handleChange(event) }></textarea>
                        </div>
                        <div>
                            <label>Trivia Settings</label>
                            <label className='form-el'>
                                <input type="checkbox" name='is_open' onChange={ () => this.handleCheck(event) }></input>
                                Open to the public
                            </label>
                            <label className='form-el'>
                                <input type="checkbox" name='should_wait' value='true' onChange={ () => this.handleCheck(event) }></input>
                                Wait for players
                            </label>
                        </div>
                        <div>
                            <button type='submit' className="continue-btn form-el">Continue</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}