import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export class TriviaDetail extends Component {
    constructor() {
        super();

        this.state = {
            trivia: {
                user_id: '',
                trivia_id: '',
                title: '',
                description: '',
                questions: [],
                is_open: false,
                should_wait: false
            },
            user: this.getUser()
        };
    }

    getUser = () => {
        // get user from local storage
        if (localStorage.user == undefined) {
            return null;
        } else {
            const token = jwt.decode(JSON.parse(localStorage.user).access_token);
    
            if (token.exp * 1000 < Date.now()) {
                localStorage.clear();
                return false;
            }
            return localStorage.user;
        }
    }

    componentDidMount() {
        this.getTrivia();
    }

    getTrivia = () => {
        if (this.state.user) {
            const token = JSON.parse(this.state.user).access_token;
            const trivia_id = this.props.match.params.id;
    
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
            }
    
            fetch(`https://danzjamz-trivia-api.herokuapp.com/trivia/${ trivia_id }`, requestOptions)
                .then(res => res.json())
                .then(data => {
                    this.setState({ 
                        trivia: {
                            user_id: data.user_id,
                            trivia_id: trivia_id,
                            title: data.title,
                            description: data.description,
                            questions: [...data.questions],
                            is_open: data.is_open,
                            should_wait: data.should_wait
                        }
                    })
                }).catch(err => {
                    console.log('get trivia by id ->', err)
                });
        } else {
            console.log('user not logged in!');
        }
    }

    addNewQuestion = () => {
        this.props.history.push(`/trivia/${ this.state.trivia.trivia_id }/questions`, { fromTriviaDetail: true });
    }

    
    deleteItem = (questionId = null) => {
        const token = JSON.parse(this.state.user).access_token;
        const baseUrl = `https://danzjamz-trivia-api.herokuapp.com/trivia/${ this.state.trivia.trivia_id }`;
        let url = baseUrl;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
        };
        
        if (questionId) {
            url = baseUrl + `/question/${ questionId }`;
        }
        
        fetch(url, requestOptions)
        .then(res => {
            if (questionId) {
                console.log('Question deleted ->', res);
                this.getTrivia();
            } else {
                console.log('Trivia deleted ->', res);
                this.props.history.push('/my-trivia');
            }
        }).catch(err => {
            console.log('delete item error ->', err);
        })
    }

    renderQuestions = () => {
        return this.state.trivia.questions.map(question => {
            return (
                <li key={ question.id }>
                    <div className='q-header-items'>
                        <h4 className='question-header'>{ question.question }</h4>

                        <div>
                            <Link className='edit-btn' to={ `/trivia/${ this.state.trivia.trivia_id }/questions/${ question.id }/edit` }>
                                <FontAwesomeIcon icon='pencil-alt' />
                            </Link>
                            <button className='del-btn' type='button' onClick={ () => this.deleteItem(question.id) }>
                                <FontAwesomeIcon icon='trash-alt' />
                            </button>
                        </div>
                    </div>

                    <p className='category-header'>Category: { question.category }</p>
                    <p className='timed-header'>Timed Question: { question.is_timed ? 'Yes' : 'No' }</p>
                    { question.is_timed ? (
                        <p className='time'>{ question.time } seconds</p>
                    ) : null }

                    <h4>Answers</h4>
                    <ul className="answers">
                        { this.renderAnswers(question) }
                    </ul>
                </li>
            )
        });
    }

    renderAnswers = (question) => {
        return question.answers.map(answer => {
            return (
                <li key={ answer.id }
                    className={'answer ' + (answer.is_correct_answer ? 'correct' : 'incorrect')}>
                        { answer.answer }
                </li>
            );
        });
    }
   
    render() {
        return (
            <div className='trivia-detail'>
                <div className='detail-container'>
                    <div className='heading'>
                        <div className='title-with-buttons'>
                            <h1>{ this.state.trivia.title }</h1>

                            <div>
                                <Link className='edit-btn' to={`/trivia/${ this.state.trivia.trivia_id }/edit`}>
                                    <FontAwesomeIcon icon='pencil-alt' />
                                </Link>
                                <button className='del-btn' type='button' onClick={ () => this.deleteItem() }>
                                    <FontAwesomeIcon icon='trash-alt' />
                                </button>
                            </div>
                        </div>

                        <h3>{ this.state.trivia.description }</h3>
                    </div>
                    <div className='questions-container'>
                        <div className='questions-header'>
                            <h3>Questions</h3>
                            <button onClick={ this.addNewQuestion }>
                                <FontAwesomeIcon icon='plus' />
                            </button>
                        </div>

                        <ul className='questions'>
                            { this.renderQuestions() }
                        </ul>
                    </div>
                    <div className='settings'>
                        <h4>Settings</h4>

                        <p>Open to the public: { this.state.trivia.is_open ? 'Yes' : 'No' }</p>
                        <p>Wait for all answers before next question: { this.state.trivia.should_wait ? 'Yes' : 'No' }</p>
                    </div>
                </div>
            </div>
        )
    }
}