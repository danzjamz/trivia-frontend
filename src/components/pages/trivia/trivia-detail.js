import React from 'react';


export function TriviaDetail(props) {
    const trivia = props.location.trivia;
    console.log(trivia)

    const renderQuestions = () => {
        return trivia.questions.map(question => {
            return (
                <li>
                    <h4>{ question.question }</h4>
                    <h5>Answers</h5>
                    <ul className="answers-container">
                        { renderAnswers(question) }
                    </ul>
                </li>
            )
        });
    }

    const renderAnswers = (question) => { // ADD CORRECT ANSWER TAG IN DB
        return question.answers.map(answer => {
            return (
                <li className="answers">{ answer.answer }</li>
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