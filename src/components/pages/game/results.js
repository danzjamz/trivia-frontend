import React from 'react';
import { Link } from 'react-router-dom';

export default function Results(props) {
    const playerAnswers = props.location.state.answersChosen;
    let totalScore = 0;
    let correctAnswers = 0;

    for (const ans of playerAnswers) {
        if (ans.answerChosen.is_correct_answer) {
            totalScore += 1;
        }
    }

    correctAnswers = totalScore;
    totalScore = ((totalScore / playerAnswers.length) * 100).toFixed(2);

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
                <div className='overall-score'>
                    <h1>You got &nbsp; 
                        <span className={ totalScore > 75 ? 'great' : 
                                            totalScore > 50 ? 'good' :
                                            totalScore > 25 ? 'poor' : 'dismal' }>
                            { totalScore }%
                        </span>
                    </h1>
                    <h2>{ correctAnswers }/{ playerAnswers.length } questions</h2>
                </div>
                <h2 className='details'>Details:</h2>
                { playerAnswers ? (
                    playerAnswers.map(answerData => {
                        return (
                            <div className='results-q-container' key={ answerData.answerChosen.id }>
                                <div className='results-question'>{ answerData.question.question }</div>
                                <ul className='results-ans-container'>
                                    { renderAnswers(answerData) }
                                </ul>
                            </div>
                        )
                    })
                ) : null }
            </div>
                <Link className='results-home-btn' to='/'>Back to Home</Link>
        </div>
    )
}