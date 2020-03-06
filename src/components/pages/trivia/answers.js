import React from 'react';

export default function Answers({ answers, updateAnswer, deleteAnswer }) {

    const answerList = answers.length ? (
        answers.map(answer => {
            return (
                <div key={answer.id}>
                    <div>
                        {/* { answer.answer } */}
                        <input
                            name='answer'
                            type='text'
                            value={ answer.answer }
                            onChange={ (event) => updateAnswer(event, answer.id) }
                        />
                    </div>
                    <label>
                        { answer.isCorrectAnswer ? 'Correct Answer' : 'Incorrect Answer' }
                    </label>
                    <button type='button' onClick={ () => deleteAnswer(answer.id) }>Delete</button>
                </div>
            )
        })
    ) : (
        <p> Add some answers! </p>
    )

    return (
        <div>
            { answerList }
        </div>
    )
}