import React, { Component } from 'react';
import { Link } from 'react-router-dom';



export default class NewTrivia extends Component {
    constructor() {
        super();

        this.state = {
            user_id: 1,
            title: '',
            description: '',
            questions: '',
            isOpen: '',
            shouldWait: ''
        }
    }

    submitForm = () => {

    }

    render() {
        return (
            <div className='new-trivia-container'>
                <h1 className='new-trivia-title'>New Trivia</h1>
                <div className='new-trivia-wrapper'>
                    {/* <form onSubmit={ this.submitForm }> */}
                    <form>
                        <div>
                            <label>Title</label>
                            <input className='form-el' type="text" name="title" placeholder="title"></input>
                            <label>Description</label>
                            <textarea className='form-el' type="text" name="description" placeholder="description" rows='10'></textarea>
                        </div>
                        <div>
                            <label>Trivia Settings</label>
                            <label className='form-el'>
                                <input type="checkbox" name='isOpen'></input>
                                Open to the public
                            </label>
                            <label className='form-el'>
                                <input type="checkbox" name='shouldWait'></input>
                                Wait for players
                            </label>
                        </div>
                        <div className="continue-btn form-el">
                            <Link to='/new-trivia/questions'>Continue</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}