import React, { Component } from 'react';
import { GetTrivia } from '../../../services/trivia-service';
import { Link } from 'react-router-dom';

export default class StartTrivia extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trivia: { },
            questions: []
        }
    }

    componentDidMount() {
        const triviaId = this.props.match.params.id;

        GetTrivia(triviaId).then(res => {
            this.setState({ trivia: res, questions: res.questions })
        }).catch(err => {
            console.log('get trivia error ->', err);
        });
    }


    render() {
        return (
            <div className='start-trivia-container'>
                <div className='start-trivia-wrapper'>
                    <div>
                        <h1>{ this.state.trivia.title }</h1>
                        <h3>{ this.state.trivia.description }</h3>
                        <h3><span className='start-questions-len'>{ this.state.questions.length }</span>
                            { this.state.questions.length > 1 || this.state.questions.length === 0 ? 
                            ' questions'
                            : ' question' }
                        </h3>
                    </div>

                    { this.state.questions.length > 0 ? (
                        <Link className='giant-btn' to={
                            { pathname: `/trivia/${this.state.trivia.trivia_id}/play/questions`, 
                            state: { questions: this.state.trivia.questions }
                            }}>
                            Start
                        </Link>
                    ) : (
                        <Link to='/'>
                            Back to Home
                        </Link>
                    )}
                </div>
            </div>
        )
    }
}