import React, { Component } from 'react';


export default class ViewTrivia extends Component {
    constructor(props) {
        super();

        this.state = {
            trivias: [ ]
        }

        console.log(this.getTrivias().then(async res => {
            await this.setState({ trivias: res })
        }))
        console.log('state', this.state.trivias) // poopy
    }

    async getTrivias() {
        return await fetch('http://127.0.0.1:4200/trivias')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                console.log(myJson.trivias)
                return myJson.trivias;
                // this.setState({ trivias: myJson.trivias})
                // console.log(this.state.trivias)
            });
    }
        
    render() {
        return (
            <div>
                <h1>View Trivia</h1>
                {/* <h3>{trivias[0].title}</h3> */}
                {/* {trivias ? <h3>{trivias[0].title}</h3> : null} */}
            </div>
        )
    }
}