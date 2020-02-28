import React, { Component } from 'react';


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
            .then((myJson) => {
                console.log(myJson.trivias);
                this.setState({ trivias: myJson.trivias});
            });
    }

    renderTrivias = () => {
        return this.state.trivias.map(trivia => {
            return <h3>{ trivia.title }</h3>
        })
    }
        
    render() {
        return (
            <div>
                <h1>View Trivia</h1>
                { this.renderTrivias() }
            </div>
        )
    }
}