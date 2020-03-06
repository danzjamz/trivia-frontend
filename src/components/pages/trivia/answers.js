import React from 'react';

export default function Answers({ answers, deleteAnswer }) {

    const answerList = answers.length ? (
        answers.map(answer => {
            return (
                <div key={answer.id}>
                    <div>
                        { answer.answer }
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