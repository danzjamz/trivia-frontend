import React from 'react';


export function TriviaDetail(props) {
    const trivia = props.location.trivia;

    const renderQuestions = () => {
        return trivia.questions.map(question => {
            return (
                <li key={ question.id }>
                    <h4>{ question.question }</h4>
                    <h5>Answers</h5>
                    <ul className="answers">
                        { renderAnswers(question) }
                    </ul>
                </li>
            )
        });
    }

    const renderAnswers = (question) => {
        return question.answers.map(answer => {
            return (
                <li key={ answer.id }
                    className={'answer ' + (answer.isCorrectAnswer ? 'correct' : 'incorrect')}>
                        { answer.answer }
                </li>
            );
        });
    }
   

    return (
        <div className='trivia-detail'>
            <div className='heading'>
                <h1>{ trivia.title }</h1>
                <h3>{ trivia.description }</h3>
            </div>
            <div className='questions-container'>
                <h4>Questions</h4>
                <ul className='questions'>
                    { renderQuestions() }
                </ul>
            </div>
            <div className='settings'>
                <h4>Settings</h4>
                <p>Open to the public: { trivia.isOpen ? 'Yes' : 'No' }</p>
                <p>Wait for all answers before next question: { trivia.shouldWait ? 'Yes' : 'No' }</p>
            </div>
        </div>
    )
}