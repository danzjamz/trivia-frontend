import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';


export default class NewTrivia extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: ( this.props.match.params.id ?
                            true : false ),
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

    componentWillMount() {
        if (this.state.editMode && this.state.user) {
            const token = JSON.parse(this.state.user).access_token;
            const trivia_id = this.props.match.params.id;

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
            }

            fetch(`http://127.0.0.1:4200/trivia/${ trivia_id }`, requestOptions)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.setState({ 
                        trivia: {
                            user_id: data.user_id,
                            title: data.title,
                            description: data.description,
                            questions: '',
                            is_open: data.is_open,
                            should_wait: data.should_wait
                        }
                    })
                }).catch(err => {
                    console.log('get trivia by id ->', err)
                })
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
            let url = 'http://127.0.0.1:4200/trivia';
            const requestOptions = {
                method: ( this.state.editMode ? 'PUT' : 'POST' ),
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                body: JSON.stringify(this.state.trivia)
            };
            const triviaId = this.props.match.params.id;

            if (this.state.editMode) {
                url = url + `/${ triviaId }`;
            }
    
            fetch(url, requestOptions)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        if (this.state.editMode) {
                            this.props.history.push(`/trivia/${ triviaId }`);
                        } else {
                            this.props.history.push(`/trivia/${ data.id }/questions`);
                        }
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
                <h1 className='new-trivia-title'>
                    {  ( this.props.match.params.id ?
                            'Edit Trivia' : 'New Trivia' ) }
                </h1>
                <div className='new-trivia-wrapper'>
                    <form onSubmit={ this.submitForm }>
                        <div>
                            <label>Title</label>
                            <input 
                                className='form-el'
                                type="text"
                                name="title"
                                placeholder="title"
                                value={ this.state.trivia.title }
                                onChange={ () => this.handleChange(event) } 
                            />
                            <label>Description</label>
                            <textarea 
                                className='form-el'
                                type="text"
                                name="description"
                                placeholder="description"
                                value={ this.state.trivia.description }
                                rows='10' 
                                onChange={ () => this.handleChange(event) } 
                            />
                        </div>
                        <div>
                            <label>Trivia Settings</label>
                            <label className='form-el'>
                                <input 
                                    type="checkbox"
                                    name='is_open'
                                    checked={ this.state.trivia.is_open }
                                    onChange={ () => this.handleCheck(event) }
                                />
                                Open to the public
                            </label>
                            <label className='form-el'>
                                <input 
                                    type="checkbox" 
                                    name='should_wait' 
                                    checked={ this.state.trivia.should_wait }
                                    onChange={ () => this.handleCheck(event) } 
                                />
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