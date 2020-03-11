import React from 'react';
import { Link } from 'react-router-dom';


export function TriviaDetail(props) {
    const trivia = props.location.trivia;

    const renderQuestions = () => {
        return trivia.questions.map(question => {
            return (
                <li key={ question.id }>
                    <h4 className='question-header'>{ question.question }</h4>
                    <p className='category-header'>Category: { question.category }</p>
                    <p className='timed-header'>Timed Question: { question.is_timed ? 'Yes' : 'No' }</p>
                    <h4>Answers</h4>
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
                <div className='title-with-buttons'>
                    <h1>{ trivia.title }</h1>
                    <Link to={`/trivia/${ trivia.id }/edit`}>
                        Edit
                    </Link>
                </div>
                <h3>{ trivia.description }</h3>
            </div>
            <div className='questions-container'>
                <h3>Questions</h3>
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