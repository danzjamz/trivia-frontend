import React, { Component } from 'react';
import { TriviaDetail } from './trivia-detail';
import { Link } from 'react-router-dom';


export default class ViewTrivia extends Component {
    constructor(props) {
        super();

        this.state = {
            trivias: [ ]
        }
    }
    
    componentWillMount() {
        this.getTrivias();
    }

    getTrivias() {
        fetch('http://127.0.0.1:4200/trivias')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data.trivias);
                this.setState({ trivias: data.trivias});
            });
    }

    renderTrivias = () => {
        return this.state.trivias.map(trivia => {
            return (
                <li className='trivia-item' key={ trivia.id }>
                    <Link to={ `/trivia/${ trivia.id }` }>
                        <h1>{ trivia.title }</h1>
                        <h4>{ trivia.description }</h4>
                    </Link>
                    <Link className='play-trivia-btn' to={ `/trivia/${ trivia.id }/play`}>Play</Link>
                </li>
            )
        })
    }
        
    render() {
        return (
            <div className='view-trivias-container'>
                <h2>My Trivia</h2>
                <ul className='trivia-list'>
                    { this.renderTrivias() }
                </ul>
            </div>
        )
    }
}