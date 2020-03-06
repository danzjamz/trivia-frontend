import React, { Component } from 'react';

export default class NewAnswer extends Component {
    state = {
        answer: '',
        isCorrectAnswer: false,
        id: 0
    }

    handleChange = (event) => {
        this.setState({ answer: event.target.value })
    }

    handleCheck = (event) => {
        console.log(event.target.checked)
        this.setState({ isCorrectAnswer: event.target.checked })
    }

    handleSubmit = (event) => {
        this.setState({ id: this.state.id + 1 })
        this.props.addAnswer(this.state)
        this.setState({
            answer: '',
            isCorrectAnswer: false,
        });
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={ this.handleSubmit }>
                <input
                    type='text'
                    name='answer'
                    placeholder='add answer'
                    value={ this.state.answer }
                    onChange={ this.handleChange } 
                />
                <label>
                    <input
                        type='checkbox'
                        name='isCorrectAnswer'
                        checked={ this.state.isCorrectAnswer }
                        onChange={ this.handleCheck }
                    />
                    Correct Answer
                </label>
                <button type='submit'>+</button>
            </form>
        )
    }
}