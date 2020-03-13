import React, { Component } from 'react';

export default class PlayQuestions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: this.props.location.state.questions,
            currentQuestionIndex: 0,
            answerChosen: { },
            answersChosen: [ ]
        }

        this.handleSubmit = this.handleSubmit.bind(this);
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
                    <p onClick={ () => this.setAnswer(answer) }>{ answer.answer }</p>
                </li>
            )
        })
    }

    setAnswer = (answer) => {
        this.setState({ answerChosen: answer });
        console.log(this.state.answerChosen)
    }

    async handleSubmit()  {
        const currentQuestion = this.state.questions[this.state.currentQuestionIndex];
        const correctAnswers = currentQuestion.answers.filter(answer => {
            return answer.is_correct_answer === true;
        });

        await this.setState({
            answersChosen: [ ...this.state.answersChosen, 
                { 
                    question: currentQuestion.question,
                    correctAnswers: correctAnswers,
                    answerChosen: this.state.answerChosen 
                }
            ]
        });

        if (this.state.currentQuestionIndex < this.state.questions.length - 1) {
            this.setState({ 
                currentQuestionIndex: this.state.currentQuestionIndex + 1 
            });
        } else {
            console.log(this.state.answersChosen);
            const triviaId = this.state.questions[this.state.currentQuestionIndex].trivia_id;
            this.props.history.push(`/trivia/${triviaId}/play/results`, { answersChosen: this.state.answersChosen });
        }

        // event.preventDefault();  // down here triggers warning, at top doesn't; seems to work without it at
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