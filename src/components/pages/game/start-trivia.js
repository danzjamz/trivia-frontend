import React, { Component } from 'react';
import { GetTriviaService } from '../../../services/get-trivia';
import { Link } from 'react-router-dom';

export default class StartTrivia extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trivia: { }
        }
        console.log(props)
    }

    componentDidMount() {
        const triviaId = this.props.match.params.id;

        GetTriviaService(triviaId).then(res => {
            this.setState({ trivia: res })
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
                    </div>

                    <Link to={
                        { pathname: `/trivia/${this.state.trivia.trivia_id}/play/questions`, 
                          state: { questions: this.state.trivia.questions }
                        }}>
                        Start
                    </Link>
                </div>
            </div>
        )
    }
}