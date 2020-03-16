import React from 'react';

export default function Results(props) {
    const playerAnswers = props.location.state.answersChosen;

    const renderCorrectAnswers = (chosenAnswer, correctAnswers) => {
        let isCorrect = false;
        let otherCorrectAnswers = [ ];

        return correctAnswers.map((correctAnswer, index) => {
            if (chosenAnswer.id === correctAnswer.id) {
                isCorrect = true;
                otherCorrectAnswers = correctAnswers.filter(ans => ans.id !== correctAnswer.id)

                return (
                    <div>
                        <div>
                            { chosenAnswer.answer } is Correct!
                        </div>
                        <div>
                            { otherCorrectAnswers.length > 0 ? (
                                otherCorrectAnswers.length > 1 ? (
                                    <div>
                                        Other correct answers: { otherCorrectAnswers.map((otherAns, i) => {
                                            return <span key={otherAns.id}>{ otherAns.answer }{ i !== otherCorrectAnswers.length - 1 ? ', ' : '' }</span>;
                                        }) }
                                    </div>
                                ) : (
                                    <div>Another correct answer: { correctAnswer.answer }</div>
                                )
                            ) : null }
                        </div>
                    </div>
                )
            } else if (index === correctAnswers.length - 1 && !isCorrect) {
                return (
                    <div>
                        <div>{chosenAnswer.answer} is incorrect.</div>
                        <div>
                            { correctAnswers.length > 1 ? (
                                <div> Correct answers: 
                                    { correctAnswers.map((corAns, index) => {
                                        return <span key={corAns}> { corAns.answer }{ index !== correctAnswers.length - 1 ? ', ' : '' }</span>
                                    }) }
                                </div>
                            ) : (
                                `Correct answer: ${ correctAnswer.answer }`
                            ) }
                        </div>
                    </div>
                )
            }
        });
    }

    return (
        <div>
            { playerAnswers ? (
                playerAnswers.map(answerData => {
                    return (
                        <div key={ answerData.answerChosen.id }>
                            <div>Question: { answerData.question }</div>
                            {/* <div>Your Answer: { answerData.answerChosen.answer }</div> */}
                            { renderCorrectAnswers(answerData.answerChosen, answerData.correctAnswers) }
                        </div>
                    )
                })
            ) : null }
        </div>
    )
}