import React, { Component } from 'react';

import NewAnswer from './new-answer';
import Answers from './answers';

export default class NewQuestion extends Component {
    constructor() {
        super();

        this.state = {
            trivia_id: 3,
            question: '',
            category: '',
            isTimed: false,
            answers: [ { id: 1, answer: 'answer1', isCorrectAnswer: false }, { id: 2, answer: 'answer2', isCorrectAnswer: true } ]
        }
    }

    addAnswer = (answer) => {
        this.setState({ answers: [...this.state.answers, answer] })
    }

    // updateAnswer = (answer) => {
    //     for (ans in this.state.answers) {
    //         if (this.state.answers[ans].id === answer.id) {
    //             this.setState({ answers: [ans].answer  })
    //         }
    //     }
    // }

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
                <form>
                    {/* <input 
                        name='question' 
                        value={ this.state.question.question } 
                        placeholder='question'
                        onChange={ this.handleChange }>
                    </input>
                    <input 
                        name='category' 
                        value={ this.state.question.category } 
                        placeholder='category'
                        onChange={ this.handleChange }>
                    </input>
                    <label>
                        <input
                            type='checkbox'
                            name='isTimed'
                            value={ this.state.question.isTimed }
                            onChange={ this.handleCheck }>
                        </input>
                        Timed Question
                    </label> */}
                    <NewAnswer addAnswer={ this.addAnswer } />
                    <div>
                        <Answers answers={ this.state.answers } />
                    </div>
{/*                     
                     <button type='button' onClick={ this.addNewAnswerInput }>Add Answer</button>

                     <button type='submit'>Submit and Add another question</button>
                     <button type='submit'>Submit and Finish</button> */}
                </form>
            </div>
        )
    }
}