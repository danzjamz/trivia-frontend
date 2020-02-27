import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// import styles from '../../../style/navbar.module.css';

export default class Navigation extends Component {
    constructor(props) {
        super();

        this.state = {
            isToggle: false,
            burgerActiveClass: '',
            navActiveClass: ''
        }
    }

    toggleBurger = () => {
        console.log('toggleburger')
        if (this.state.isToggle) {
            this.setState({ isToggle: false, navActiveClass: 'nav-active', burgerActiveClass: 'burger-active' })
        } else {
            this.setState({ isToggle: true, navActiveClass: '', burgerActiveClass: '' })
        }
    }

    render() {
        return (
            <div className={'nav ' + this.state.navActiveClass}>
                <div className="nav-burger">
                    <i className="fas fa-hamburger burger" activeClassName={this.state.burgerActiveClass} onClick={() => this.toggleBurger()}></i>

                </div>
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