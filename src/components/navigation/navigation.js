import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// import styles from '../../../style/navbar.module.css';

export default class Navigation extends Component {
    constructor(props) {
        super();

        this.state = {
            isToggle: false,
            burgerActiveClass: ''
        }
    }

    toggleBurger = () => {
        console.log('toggleburger')
        if (this.state.isToggle) {
            this.setState({ isToggle: false, burgerActiveClass: 'burger-active' })
        } else {
            this.setState({ isToggle: true, burgerActiveClass: '' })
        }
    }

    render() {
        return (
            <div className='nav'>
                <div className='nav-left'>
                    <i className={"fas fa-hamburger burger " + this.state.burgerActiveClass} onClick={() => this.toggleBurger()}></i>
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