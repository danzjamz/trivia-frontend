import React, { Component } from 'react';

import NewAnswer from './new-answer';
import Answers from './answers';

export default class NewQuestion extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            editMode: ( this.props.match.params ? true : false ),
            triviaId: this.props.match.params.triviaId,
            questionId: this.props.match.params.questionId,
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
        this.setState({ answers: [...this.state.answers, answer] })
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

    deleteAnswer = (answerId) => {
        const newAnswers = this.state.answers.filter(answer => {
            return answer.id !== answerId;
        });
        this.setState({ answers: [...newAnswers] });
    }

    postNewQuestion = () => {
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
                    // if (questionData) {
                    //     this.postNewAnswer(token, questionData.id);
                    // } else {
                    //     console.log('Something went wrong posting the question!');
                    // }
                }).catch(err => {
                    console.log('Post question error ->', err);
                });
        } else {
            console.log('user not logged in!');
        }
    }

    postNewAnswer = (token, questionId) => {
        for (let answer in this.state.answers) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                body: JSON.stringify(this.state.answers[answer])
            };
    
            fetch(`http://127.0.0.1:4200/trivia/${ this.state.trivia_id }/question/${ questionId }/answer`, requestOptions)
                .then(res => {
                    if (res.status < 400) {
                        this.setState({
                            question: {
                                question: '',
                                category: '',
                                is_timed: false,
                                time: 0
                            },
                            answers: [  ]
                        });
                    }
                }).catch(err => {
                    console.log('Post question error ->', err);
                });
        }
    }

    submitAndAddNewQ = (event) => {
        this.postNewQuestion();
        
        if (!this.state.editMode) {
            this.props.history.push('/new-trivia/questions');
        }
        event.preventDefault();
    }
    
    submitAndFinish = (event) => {
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
                                    value={ this.state.question.is_timed }
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
                                    <button type='submit' onClick={ this.submitAndAddNewQ }>Save</button>
                                </div>
                            ) : (
                                <div className='submit-btns'>
                                    <button type='submit' onClick={ this.submitAndAddNewQ }>Submit and Add Another Question</button>
                                    <button type='submit' onClick={ this.submitAndFinish }>Submit and Finish</button> 
                                </div>
                            )}
                    </form>
                </div>
            </div>
        )
    }
}