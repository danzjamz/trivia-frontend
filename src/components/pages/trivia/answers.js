import React from 'react';

export default function Answers({ answers, updateAnswer, updateCheck, deleteAnswer }) {

    const answerList = answers.length ? (
        answers.map(answer => {
            return (
                <div className='answer-wrapper' key={answer.id}>
                    <div>
                        <input
                            name='answer'
                            type='text'
                            value={ answer.answer }
                            onChange={ (event) => updateAnswer(event, answer.id) }
                        />
                    </div>
                    <div className='answer-items'>
                        <label>
                            <input
                                name='isCorrectAnswer'
                                type='checkbox'
                                checked={ answer.isCorrectAnswer }
                                onChange={ (event) => updateCheck(event, answer.id) }
                            />
                            { answer.isCorrectAnswer ? 'Correct Answer' : 'Incorrect Answer' }
                        </label>
                        <button type='button' onClick={ () => deleteAnswer(answer.id) }>Delete</button>
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