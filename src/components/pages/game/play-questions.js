import React, { Component } from 'react';
import TimeoutModal from '../modals/time-out-modal';
import NoAnsModal from '../modals/no-ans-modal';

export default class PlayQuestions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: this.props.location.state.questions,
            currentQuestionIndex: 0,
            answerChosen: null,
            answersChosen: [ ],
            timer: 0,
            timerModalIsOpen: true,
            noAnsModalIsOpen: false
        }
        let intervalId = null;

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({ timer: this.state.questions[this.state.currentQuestionIndex].time });
        this.setTimer();
    }

     componentWillUnmount() {
        clearInterval(this.intervalId);
     }

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

    async handleSubmit() {
        if (this.state.answerChosen === null) {
            this.setState({
                ...this.state,
                noAnsModalIsOpen: !this.state.noAnsModalIsOpen
            });
        } else {
            const currentQuestion = this.state.questions[this.state.currentQuestionIndex];
    
            await this.setState({
                answersChosen: [ ...this.state.answersChosen, 
                    { 
                        question: currentQuestion,
                        answerChosen: this.state.answerChosen 
                    },
                ],
                answerChosen: null
            });
            
    
            if (this.state.currentQuestionIndex < this.state.questions.length - 1) {
                await this.setState({ 
                    currentQuestionIndex: this.state.currentQuestionIndex + 1,
                    timer: this.state.questions[this.state.currentQuestionIndex + 1].time,
                    timerModalIsOpen: true
                });
            } else {
                const triviaId = this.state.questions[this.state.currentQuestionIndex].trivia_id;
                this.props.history.push(`/trivia/${triviaId}/play/results`, { answersChosen: this.state.answersChosen });
            }
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

    toggleModal = async (routeType) => {
        switch (routeType) {
            case 'BACK':
                await this.setState({ 
                    noAnsModalIsOpen: !this.state.timerModalIsOpen
                });
                break;
            case 'CONTINUE':
                await this.setState({ 
                    noAnsModalIsOpen: !this.state.timerModalIsOpen,
                    answerChosen: 'no answer chosen'
                });
                this.handleSubmit();
                break;
            case 'TIMEOUT':
                await this.setState({ 
                    timerModalIsOpen: !this.state.timerModalIsOpen,
                    noAnsModalIsOpen: false,
                    answerChosen: 'no answer chosen'
                });
                this.handleSubmit();
                break;
            default:
                console.log('not possible! modal issue');
                break;
        }
    }

    render() {
        const index = this.state.currentQuestionIndex;

        return (
            <div className='play-container'>
                { this.state.questions[index].category ? (
                    <div className='q-category'>
                        <h2>{ this.state.questions[index].category }</h2>
                    </div>
                ) : null }
                <div className='play-wrapper'>
                    <div className='game-question'>
                        <h2>
                            { this.state.questions[index].question }
                        </h2>
                        <div className={'timer ' + (this.state.timer === '00' ? 'no-time' 
                                                    : this.state.timer <= 5 && this.state.timer > 0 ? 'low-time'
                                                    : this.state.timer > 5 ? null 
                                                    : 'none') }>
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
                    { this.state.timer === '00' ?
                        <TimeoutModal 
                            isOpen={ this.state.timerModalIsOpen }
                            toggleModal={ this.toggleModal } 
                            isLastQ={ this.state.questions.length - 1 === this.state.currentQuestionIndex }
                        /> : null }
                        <NoAnsModal 
                            isOpen={ this.state.noAnsModalIsOpen }
                            toggleModal={ this.toggleModal }
                        />
                </div>
            </div>
        )
    }
}