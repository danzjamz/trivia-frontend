import React, { Component } from 'react';

export default class NewAnswer extends Component {
    state = {
        answer: '',
        is_correct_answer: false,
        id: 0
    }

    handleChange = (event) => {
        this.setState({ answer: event.target.value })
    }

    handleCheck = (event) => {
        this.setState({ is_correct_answer: event.target.checked })
    }

    handleSubmit = (event) => {
        this.setState({ id: this.state.id + 1 })

        this.props.addAnswer(this.state)

        this.setState({
            answer: '',
            is_correct_answer: false,
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
                <div className='form-items'>
                    <label>
                        <input
                            type='checkbox'
                            name='is_correct_answer'
                            checked={ this.state.is_correct_answer }
                            onChange={ this.handleCheck }
                        />
                        Correct Answer
                    </label>
                    <button type='submit'>+</button>
                </div>
            </form>
        )
    }
}