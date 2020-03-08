import React, { Component } from 'react';

import NewAnswer from './new-answer';
import Answers from './answers';

export default class NewQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trivia_id: 3,
            question: '',
            category: '',
            isTimed: false,
            time: 0,
            answers: [  ]
        }
    }

    addAnswer = (answer) => {
        this.setState({ answers: [...this.state.answers, answer] })
    }

    updateAnswer = (event, answerId) => {
        const newAnswer = event.target.value;

        const newAnswers = this.state.answers.map(answer => {
            if (answer.id === answerId) {
                answer.answer = newAnswer;
            }
            return answer;
        });

        this.setState({ answers: [...newAnswers] });
    }

    updateCheck = (event, answerId) => {
        const newCheck = event.target.checked;

        const newAnswers = this.state.answers.map(answer => {
            if (answer.id === answerId) {
                answer.isCorrectAnswer = newCheck;
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

    submitAndAddNewQ = (event) => {
        this.setState({
            question: '',
            category: '',
            isTimed: false,
            time: 0,
            answers: [  ]
        });
        this.props.history.push('/new-trivia/questions')
        event.preventDefault();
    }
    
    submitAndFinish = (event) => {
        this.props.history.push('/my-trivia')
        event.preventDefault();
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleCheck = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    }

    render() {
        return (
            <div className='question-container'>
                <h1 className='heading'>New Question</h1>

                <div className='question-wrapper'>
                    <form>
                        <div>
                            <textarea 
                                name='question' 
                                value={ this.state.question } 
                                placeholder='question'
                                rows='5'
                                onChange={ this.handleChange }
                            />
                        </div>
                        <div>
                            <input 
                                name='category' 
                                value={ this.state.category } 
                                placeholder='category'
                                onChange={ this.handleChange }>
                            </input>
                        </div>
                        <div className='is-timed-div'>
                            <label className='is-timed-checkbox'>
                                <input
                                    type='checkbox'
                                    name='isTimed'
                                    value={ this.state.isTimed }
                                    onChange={ this.handleCheck }
                                />
                                Timed Question
                            </label>
                            {  this.state.isTimed  ? (
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
                            updateAnswer={ this.updateAnswer } 
                            updateCheck={ this.updateCheck } 
                            deleteAnswer={ this.deleteAnswer } 
                        />

                        <div className='submit-btns'>
                            <button type='submit' onClick={ this.submitAndAddNewQ }>Submit and Add Another Question</button>
                            <button type='submit' onClick={ this.submitAndFinish }>Submit and Finish</button> 
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}