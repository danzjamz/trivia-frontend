import React from 'react';

export default function Answers({answers}) {
    console.log(answers)

    const answerList = answers.length ? (
        answers.map(answer => {
            return (
                <div key={answer.id}>
                    <div>
                        { answer.answer }
                    </div>
                    <label>
                        <input type='checkbox' checked={ answer.isCorrectAnswer }></input>
                        Correct Answer
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