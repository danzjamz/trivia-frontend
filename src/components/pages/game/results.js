import React from 'react';

export default function Results(props) {
    const playerAnswers = props.location.state.answersChosen;
    console.log(playerAnswers)

    const renderAnswers = (correctAnswers) => {
        let isCorrect = false;
        return correctAnswers.map(correctAnswer => {
            // if (playerAnswers.answerChosen.id === correctAnswer.id) {
            //     isCorrect = true;
            // }
            return <div key={ correctAnswer.id }>Correct Answer: { correctAnswer.answer }</div>
        });
    }

    return (
        <div>
            { playerAnswers ? (
                playerAnswers.map(answerData => {
                    return (
                        <div key={ answerData.answerChosen.id }>
                            <div>Question: { answerData.question }</div>
                            <div>Your Answer: { answerData.answerChosen.answer }</div>
                            { renderAnswers(answerData.correctAnswers) }
                        </div>
                    )
                })
            ) : null }
        </div>
    )
}