import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'

export default class NewAnswer extends Component {
    state = {
        answer: '',
        is_correct_answer: false
    }

    handleChange = (event) => {
        this.setState({ answer: event.target.value })
    }

    handleCheck = (event) => {
        this.setState({ is_correct_answer: event.target.checked })
    }

    handleSubmit = (event) => {
        this.props.addAnswer(this.state);

        this.setState({
            answer: '',
            is_correct_answer: false,
        });

        event.preventDefault();
    }

    render() {
        return (
            <div className='new-answer-wrapper'>
                <div className='form-items'>
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
                            name='is_correct_answer'
                            checked={ this.state.is_correct_answer }
                            onChange={ this.handleCheck }
                        />
                        Correct Answer
                    </label>
                </div>
                <button className='add-btn' type='button' onClick={ this.handleSubmit }>
                    <FontAwesomeIcon icon='plus' />
                </button>
            </div>
        )
    }
}