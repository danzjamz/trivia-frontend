import React, { Component } from 'react';
import GetPublicTrivias from '../../services/trivia-service';
import { Link } from 'react-router-dom';
import RenderTrivias from './trivia/render-trivias';

export default class Home extends Component {
    constructor() {
        super();

        this.state = {
            trivias: [ ]
        }
    }

    componentDidMount() {
        this.getPublicTrivias();
    }

    getPublicTrivias = () => {
        GetPublicTrivias()
            .then(data => {
                this.setState({ trivias: data });
            }).catch(err => {
                console.log('get public trivias error ->', err)
            });
    }

    

    render() {
        return (
            <div className='view-trivias-container'>
                <h2>Trivias Open to Play</h2>
                { this.state.trivias.length > 0 ? (
                    <ul className='trivia-list'>
                        <RenderTrivias trivias={this.state.trivias} from='home' />
                    </ul>
                ) : (
                    <h3>
                        No public trivias available.
                    </h3> 
                ) }
            </div>
        )
    }
}