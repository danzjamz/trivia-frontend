import React, { Component } from 'react';
import { Link } from 'react-router-dom';



export default class NewTrivia extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: 1,
            title: '',
            description: '',
            questions: '',
            isOpen: false,
            shouldWait: false
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleCheck = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    }

    submitForm = (event) => {
        console.log('in submit')
        // fetch('http://127.0.0.1:4200/trivia')
        this.props.history.push('/new-trivia/questions');
        event.preventDefault();
    }

    render() {
        return (
            <div className='new-trivia-container'>
                <h1 className='new-trivia-title'>New Trivia</h1>
                <div className='new-trivia-wrapper'>
                    <form onSubmit={ this.submitForm }>
                    {/* <form> */}
                        <div>
                            <label>Title</label>
                            <input className='form-el' type="text" name="title" placeholder="title" onChange={ () => this.handleChange(event) }></input>
                            <label>Description</label>
                            <textarea className='form-el' type="text" name="description" placeholder="description" rows='10' onChange={ () => this.handleChange(event) }></textarea>
                        </div>
                        <div>
                            <label>Trivia Settings</label>
                            <label className='form-el'>
                                <input type="checkbox" name='isOpen' onChange={ () => this.handleCheck(event) }></input>
                                Open to the public
                            </label>
                            <label className='form-el'>
                                <input type="checkbox" name='shouldWait' value='true' onChange={ () => this.handleCheck(event) }></input>
                                Wait for players
                            </label>
                        </div>
                        <div>
                            {/* <Link to='/new-trivia/questions' type='submit'>Continue</Link> */}
                            <button type='submit' className="continue-btn form-el">Continue</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}