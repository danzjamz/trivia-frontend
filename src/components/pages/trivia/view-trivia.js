import React, { Component } from 'react';
import { TriviaDetail } from './trivia-detail';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RenderTrivias from './render-trivias';


export default class ViewTrivia extends Component {
    constructor() {
        super();

        this.state = {
            trivias: [ ],
            userId: this.getUser()
        }
    }
    
    componentDidMount() {
        this.getTrivias();
    }

    getUser = () => {
        // get user from local storage
        if (localStorage.user == undefined) {
            return null;
        } else {
            const token = jwt.decode(JSON.parse(localStorage.user).access_token);
            return token.identity;
        }
    }

    getTrivias() {
        if (this.state.userId !== null) {
            fetch(`https://danzjamz-trivia.herokuapp.com/user/${ this.state.userId }`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.setState({ trivias: data.trivias});
                });
        }
    }
        
    render() {
        return (
            <div className='view-trivias-container'>
                <h2>My Trivia</h2>
                { this.state.trivias.length > 0 ? (
                    <ul className='trivia-list'>
                        <RenderTrivias trivias={this.state.trivias} from='view-trivia' />
                    </ul>
                ) : (
                    <h3>
                        You don't have any trivias yet! 
                        <Link to='/new-trivia'> Create one now</Link>
                    </h3> 
                ) }
                <Link className='new-trivia-btn' to='/new-trivia'><FontAwesomeIcon icon='plus-circle' /></Link>
            </div>
        )
    }
}