import React from 'react';

export default function Results(props) {
    const playerAnswers = props.location.state.answersChosen;

    const renderCorrectAnswers = (chosenAnswer, correctAnswers) => {
        let isCorrect = false;
        let otherCorrectAnswers = [ ];

        return correctAnswers.map((correctAnswer, index) => {
            if (chosenAnswer.id === correctAnswer.id) {
                isCorrect = true;  
            } else if (isCorrect === true && index > 0) {
                otherCorrectAnswers.push(correctAnswer);
            }
            
            if (otherCorrectAnswers.length === 0 && isCorrect) {
                return <div key='chosenAnswer.id'>{ chosenAnswer.answer } is Correct! </div>
            } else if (otherCorrectAnswers.length > 1) {
                return (
                    <div>
                        Other correct answers: { otherCorrectAnswers.map(ans => {
                            return <div key='ans.id'> {ans.answer} </div>;
                        })}
                    </div>
                )
            } else {
                return <div key={ correctAnswer.id }>Another correct answer: { correctAnswer.answer }</div>
            } // if (otherCorrectAnswers.length === 1) 
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