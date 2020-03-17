import React, { Component } from 'react';

export default class PlayQuestions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: this.props.location.state.questions,
            currentQuestionIndex: 0,
            answerChosen: { },
            answersChosen: [ ],
            timer: 0
        }
        let intervalId = null;

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({ timer: this.state.questions[this.state.currentQuestionIndex].time });
        this.setTimer();
    }

    //  componentWillUnmount() {
    //     clearInterval(this.intervalId);
    //  }

    // ADD CATEGORY TO THE TOP OF THE QUESTION and timer

    clickAnswer = (event, answer) => {
        event.persist();
        this.setState({ answerChosen: answer });
        
        const lis = document.querySelectorAll('li');
        
        for (const li of lis) {
            li.classList.replace('active-answer', 'play-list-item')
        }

        event.target.classList.replace('play-list-item', 'active-answer');
    }

    renderAnswers = () => {
        const currentQuestion = this.state.questions[this.state.currentQuestionIndex];

        return currentQuestion.answers.map(answer => {
            return (
                <li className='play-list-item' onClick={ (e) => this.clickAnswer(e, answer) } key={ answer.id }>
                    { answer.answer }
                </li>
            )
        })
    }

    async handleSubmit()  {
        const currentQuestion = this.state.questions[this.state.currentQuestionIndex];

        await this.setState({
            answersChosen: [ ...this.state.answersChosen, 
                { 
                    question: currentQuestion,
                    answerChosen: this.state.answerChosen 
                }
            ]
        });

        if (this.state.currentQuestionIndex < this.state.questions.length - 1) {
            this.setState({ 
                currentQuestionIndex: this.state.currentQuestionIndex + 1 
            });
        } else {
            const triviaId = this.state.questions[this.state.currentQuestionIndex].trivia_id;
            this.props.history.push(`/trivia/${triviaId}/play/results`, { answersChosen: this.state.answersChosen });
        }

        // event.preventDefault();  // down here triggers warning, at top doesn't; seems to work without it at
    }

    setTimer = () => {
        this.intervalId = setInterval(() => {
            if (this.state.timer > 0) {
                if (this.state.timer <= 10) {
                    this.setState({ timer: `0${ this.state.timer - 1 }` });
                } else {
                    this.setState({ timer: this.state.timer - 1 });
                }
            }
        }, 1000);

        if (this.state.time === 0) {
            clearInterval(this.intervalId);
        }
    }

    render() {
        const index = this.state.currentQuestionIndex;
        return (
            <div className='play-container'>
                <div className='play-wrapper'>
                    <div className='game-question'>
                        <h2>
                            { this.state.questions[index].question }
                        </h2>
                        <div className={'timer ' + (this.state.timer === '00' ? 'no-time' : this.state.timer <= 5 ? 'low-time' : null) }>
                            { this.state.questions[index].time > 0 ? (
                                this.state.timer
                            ) : null }
                        </div>
                    </div>
                    
                    <ul className='play-item'>
                        { this.renderAnswers() }
                    </ul>

                    <div className='play-item button-div'>
                        { index < this.state.questions.length - 1 ? (
                            <button className='game-btns' onClick={ this.handleSubmit }>Next Question</button>
                            ) : (
                            <button className='game-btns' onClick={ this.handleSubmit }>Finish</button>                
                        )}
                    </div>
                </div>
            </div>
        )
    }
}