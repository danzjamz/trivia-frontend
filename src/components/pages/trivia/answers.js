import React from 'react';

export default function Answers({ answers }) {

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
                </div>
            )
        })
    ) : (
        <p>No answers yet</p>
    )

    return (
        <div>
            { answerList }
        </div>
    )
}