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
                    <ul>
                        { renderAnswers(question)  }
                    </ul>
                </li>
            )
        });
    }

    const renderAnswers = (question) => {
        return question.answers.map(answer => {
            return (
                <li>{ answer.answer }</li>
            );
        });
    }
   

    return (
        <div>
            <h1>{ trivia.title }</h1>
            <h4>{ trivia.description }</h4>
            <h5>Questions</h5>
            <ul>
                { renderQuestions() }
            </ul>
            <h5>Settings</h5>
            <p>Open to the public: { trivia.isOpen ? 'Yes' : 'No' }</p>
            <p>Wait for all answers before next question: { trivia.shouldWait ? 'Yes' : 'No' }</p>
        </div>
    )
}