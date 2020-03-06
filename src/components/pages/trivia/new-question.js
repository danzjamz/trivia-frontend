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
            answers: [  ]
        }
    }

    addAnswer = (answer) => {
        this.setState({ answers: [...this.state.answers, answer] })
    }

    updateAnswer = (event, answerId) => {
        const newAnswer = event.target.value;

        const newAnswers = this.state.answers.map((answer, index) => {
            if (answer.id === answerId) {
                answer.answer = newAnswer;
            }
            return answer;
        });

        this.setState({ answers: [...newAnswers] });
        console.log(this.state.answers)
    }

    deleteAnswer = (answerId) => {
        const newAnswers = this.state.answers.filter(answer => {
            return answer.id !== answerId;
        });
        this.setState({ answers: [...newAnswers] });
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
                        <Answers answers={ this.state.answers } updateAnswer={ this.updateAnswer } deleteAnswer={ this.deleteAnswer } />
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