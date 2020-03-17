import React from 'react';

export default function Results(props) {
    const playerAnswers = props.location.state.answersChosen;

    const renderAnswers = (answerData) => {
        const question = answerData.question;
        
        return question.answers.map(answer => {
            return (
                <li className={ answer.is_correct_answer ? 'correct' : 'incorrect' } key={ answer.id }>
                    { answer.answer }
                    <span>{ answerData.answerChosen.id === answer.id ? (
                        answer.is_correct_answer ? ' Correct!' : ' Incorrect'
                    ) : null }
                    </span>
                </li>
            )
        });
    }

    return (
        <div className='results-container'>
            <div className='results-wrapper'>
                { playerAnswers ? (
                    playerAnswers.map(answerData => {
                        return (
                            <div className='results-q-container' key={ answerData.answerChosen.id }>
                                <div className='results-question'>Question: { answerData.question.question }</div>
                                <ul className='results-ans-container'>
                                    { renderAnswers(answerData) }
                                </ul>
                            </div>
                        )
                    })
                ) : null }
            </div>
        </div>
    )
}