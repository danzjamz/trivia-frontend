import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// import styles from '../../../style/navbar.module.css';

export default class Navigation extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div className='nav'>
                <div className='nav-left'>
                    <NavLink exact to='/' className="nav-link">Home</NavLink>
                    <NavLink to='/new-trivia'className="nav-link">New Trivia</NavLink>

                </div>
                <div className='nav-right'>
                    <NavLink to='/login'className="nav-link">Login</NavLink>

                </div>

            </div>
        )
    }
}