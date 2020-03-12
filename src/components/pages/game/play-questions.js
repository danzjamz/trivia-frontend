import React, { Component } from 'react';

export default class PlayQuestions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: this.props.location.state.questions,
            currentQuestionIndex: 0
        }

        console.log(props)
    }

    // componentDidMount() {
    //     console.log(props.location.state.questions)
    //     this.setState({ currentQuestion: this.state.questions[0]});
    //     console.log(this.state.questions[0])
    // }

    renderAnswers = () => {
        const currentQuestion = this.state.questions[this.state.currentQuestionIndex];

        return currentQuestion.answers.map(answer => {
            return (
                <li key={ answer.id }>
                    <p>{ answer.answer }</p>
                </li>
            )
        })
    }

    handleSubmit = (event) => {
        if (this.state.currentQuestionIndex < this.state.questions.length - 1) {
            this.setState({ currentQuestionIndex: this.state.currentQuestionIndex + 1 });
        } else {
            const triviaId = this.state.questions[this.state.currentQuestionIndex].trivia_id;
            this.props.history.push(`/trivia/${triviaId}/play/results`);
        }

        event.preventDefault();
    }

    render() {
        return (
            <div className='play'>
                <div>
                    { this.state.questions[this.state.currentQuestionIndex].question }
                </div>
                
                <ul>
                    { this.renderAnswers() }
                </ul>

                <div>
                    { this.state.currentQuestionIndex < this.state.questions.length - 1 ? (
                        <button onClick={ this.handleSubmit }>Next Question</button>
                        ) : (
                        <button onClick={ this.handleSubmit }>Finish</button>                
                    )}
                </div>
            </div>
        )
    }
}