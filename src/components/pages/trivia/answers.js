import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Answers({ answers, updateAnswer, updateCheck, deleteAnswer }) {
    let answerId = null;
    
    const answerList = answers.length ? (
        answers.map((answer, index) => {
            if (answer.id) {
                answerId = answer.id;
            }

            return (
                <div className='answer-wrapper' key={index}>
                    <div className='answer-text'>
                        <input
                            name='answer'
                            type='text'
                            value={ answer.answer }
                            onChange={ (event) => updateAnswer(event, index) }
                        />
                    </div>
                    <div className='answer-items'>
                        <label>
                            <input
                                name='is_correct_answer'
                                type='checkbox'
                                checked={ answer.is_correct_answer }
                                onChange={ (event) => updateCheck(event, index) }
                            />
                            { answer.is_correct_answer ? 'Correct Answer' : 'Incorrect Answer' }
                        </label>
                        <button type='button' className='del-btn' onClick={ () => deleteAnswer(index, answerId) }>
                            <FontAwesomeIcon icon='minus' />
                        </button>
                    </div>
                </div>
            )
        })
    ) : (
        <p> Add some answers! </p>
    )

    return (
        <div className='answers-container'>
            { answerList }
        </div>
    )
}