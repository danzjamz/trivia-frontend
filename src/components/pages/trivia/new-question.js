import React, { Component } from 'react';

import NewAnswer from './new-answer';
import Answers from './answers';

export default class NewQuestion extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            editMode: ( this.props.match.params.questionId ? true : false ),
            triviaId: this.props.match.params.triviaId,
            questionId: ( this.props.match.params.questionId ? 
                            this.props.match.params.questionId : null ),
            question: {
                question: '',
                category: '',
                is_timed: false,
                time: 0
            },
            answers: [  ],
            user: this.getUser()
        }
    }

    componentWillMount() {
        this.getTrivia();
    }

    getTrivia = () => {
        if (this.state.editMode && this.state.user) {
            const token = JSON.parse(this.state.user).access_token;

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
            }

            fetch(`http://127.0.0.1:4200/trivia/${ this.state.triviaId }/question/${ this.state.questionId }`, requestOptions)
                .then(res => res.json())
                .then(data => {
                    this.setState({ 
                        question: {
                            question: data.question,
                            category: data.category,
                            is_timed: data.is_timed,
                            time: 0
                        },
                        answers: [ ...data.answers ]
                    });
                }).catch(err => {
                    console.log('get trivia by id ->', err)
                }
            );
        }
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

    addAnswer = (answer) => {
        if (this.state.editMode) {
            const token = JSON.parse(this.state.user).access_token;
            this.postNewAnswer(token, this.state.questionId, [answer], true) // pass token :)
        } else {
            this.setState({ answers: [...this.state.answers, answer] });
        }
    }

    updateAnswerText = (event, answerIndex) => {
        const newAnswer = event.target.value;

        const newAnswers = this.state.answers.map((answer, index) => {
            if (index === answerIndex) {
                answer.answer = newAnswer;
            }
            return answer;
        });

        this.setState({ answers: [...newAnswers] });
    }

    updateAnswerCheck = (event, answerIndex) => {
        const newCheck = event.target.checked;

        const newAnswers = this.state.answers.map((answer, index) => {
            if (index === answerIndex) {
                answer.is_correct_answer = newCheck;
            }
            return answer;
        });
        
        this.setState({ answers: [...newAnswers] });
    }

    deleteAnswer = (answerIndex, id=null) => {
        if (this.state.editMode) {
            const token = JSON.parse(this.state.user).access_token;
            const url = `http://127.0.0.1:4200/trivia/${ this.state.triviaId }/question/${this.state.questionId }/answer/${ id }`;
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
            };
        
            fetch(url, requestOptions)
                .then(res => {
                    console.log('Answer deleted ->', res)
                    this.getTrivia();
                }).catch(err => {
                    console.log(err);
                }
            );
        } else {
            const newAnswers = this.state.answers.filter((answer, index) => {
                return index !== answerIndex;
            });
            this.setState({ answers: [...newAnswers] });
        }
    }

    postNewQuestion = () => {
        return new Promise((resolve, reject)=>{
            if (this.checkUser) {
                const token = JSON.parse(this.state.user).access_token;
                let url = `http://127.0.0.1:4200/trivia/${ this.state.triviaId }/question`;
                const requestOptions = {
                    method: ( this.state.editMode ? 'PUT' : 'POST' ),
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                    body: JSON.stringify(this.state.question)
                };
                
                if (this.state.editMode) {
                    url += `/${ this.state.questionId }`
                }
                
                fetch(url, requestOptions)
                .then(response => {
                    console.log(response)
                    return response.json();
                }).then(questionData => {
                    if (questionData) {
                        this.postNewAnswer(token, questionData.id, this.state.answers).then(resolve).catch(reject);
                    } else {
                        reject('Something went wrong posting the question!');
                    }
                }).catch(err => {
                    reject('Post question error ->', err);
                });
            } else {
                reject('user not logged in!');
            }
        })
    }

    postNewAnswer = (token, questionId, answers, addNewInEdit=false) => {
        const baseUrl = `http://127.0.0.1:4200/trivia/${ this.state.triviaId }/question/${ questionId }/answer`
        let url = baseUrl;
        const requests = [];
        for (let answer in answers) {
            requests.push(new Promise((resolve, reject)=>{
                const requestOptions = {
                    method: ( this.state.editMode && !addNewInEdit ? 'PUT' : 'POST' ),
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                    body: JSON.stringify(answers[answer])
                };
                
                if (this.state.editMode && !addNewInEdit) {
                    url = baseUrl + `/${ answers[answer].id }`;
                }
        
                fetch(url, requestOptions)
                    .then(res => {
                        console.log(res);
                        resolve(res)
                        if (this.state.editMode && addNewInEdit) {
                            this.getTrivia();
                        }
                    }).catch(reject)
            }))
        }
        return Promise.all(requests)
    }

    submitQuestion = (event) => {
        this.postNewQuestion().then((res)=>{
            if (!this.state.editMode) {
                this.setState({
                    question: {
                        question: '',
                        category: '',
                        is_timed: false,
                        time: 0
                    },
                    answers: [  ]
                });
            } else {
                this.props.history.push(`/trivia/${ this.state.triviaId }`)
            }
        }).catch((err)=>{
            console.log(err)
        });
        
        event.preventDefault();
    }
    
    submitAndFinish = (event) => {
        this.postNewQuestion();

        this.props.history.push('/my-trivia');
        event.preventDefault();
    }

    handleChange = (event) => {
        this.setState({ question: { ...this.state.question, [event.target.name]: event.target.value } });
    }

    handleCheck = (event) => {
        this.setState({ question: { ...this.state.question, [event.target.name]: event.target.checked } });
    }

    render() {
        return (
            <div className='question-container'>
                <h1 className='heading'>
                    { this.state.editMode ? 
                        'Edit Question' : 'New Question' }
                </h1>

                <div className='question-wrapper'>
                    <form>
                        <div>
                            <textarea 
                                name='question' 
                                value={ this.state.question.question } 
                                placeholder='question'
                                rows='5'
                                onChange={ this.handleChange }
                            />
                        </div>
                        <div>
                            <input 
                                name='category' 
                                value={ this.state.question.category } 
                                placeholder='category'
                                onChange={ this.handleChange }>
                            </input>
                        </div>
                        <div className='is-timed-div'>
                            <label className='is-timed-checkbox'>
                                <input
                                    type='checkbox'
                                    name='is_timed'
                                    checked={ this.state.question.is_timed }
                                    onChange={ this.handleCheck }
                                />
                                Timed Question
                            </label>
                            {  this.state.question.is_timed  ? (
                                <div className='seconds-label'>
                                    <input 
                                        type='text'
                                        placeholder='s'
                                        className='seconds-input'
                                    />
                                    seconds
                                </div>
                                ) : (
                                    null
                            ) }
                            {/* this input doesn't do anything yet */}
                        </div>
                        <div className='new-answer-form'>
                            <NewAnswer addAnswer={ this.addAnswer } />
                        </div>
                        <h3>Answers</h3>
                        <Answers
                            answers={ this.state.answers } 
                            updateAnswer={ this.updateAnswerText } 
                            updateCheck={ this.updateAnswerCheck } 
                            deleteAnswer={ this.deleteAnswer } 
                        />

                            { this.state.editMode ? (
                                <div className='submit-btns'>
                                    <button type='submit' onClick={ this.submitQuestion }>Save</button>
                                </div>
                            ) : (
                                <div className='submit-btns'>
                                    <button type='submit' onClick={ this.submitQuestion }>Submit and Add Another Question</button>
                                    <button type='submit' onClick={ this.submitAndFinish }>Submit and Finish</button> 
                                </div>
                            )}
                    </form>
                </div>
            </div>
        )
    }
}

// for the future! https://docs.sqlalchemy.org/en/13/orm/persistence_techniques.html#bulk-operations