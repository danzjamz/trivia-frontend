import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// import styles from '../../../style/navbar.module.css';

export default class Navigation extends Component {
    constructor(props) {
        super();

        this.state = {
            isToggle: true,
            navActiveClass: '',
            isLoggedIn: false
        }
    }

    componentDidMount() {
        // get user from local storage
        console.log(localStorage.user)
        // user = localStorage.user
    }

    toggleBurger = () => {
        if (this.state.isToggle) {
            this.setState({ isToggle: false, navActiveClass: 'nav-active' })
        } else {
            this.setState({ isToggle: true, navActiveClass: '' })
        }
    }

    render() {
        return (
            <div className={'nav ' + this.state.navActiveClass}>
                <div className="nav-burger">
                    <i className="fas fa-hamburger burger" onClick={() => this.toggleBurger()}></i>

                </div>
                <div className='nav-left'>
                    <NavLink exact to='/' className="nav-link">Home</NavLink>
                    <NavLink to='/new-trivia'className="nav-link">New Trivia</NavLink>

                </div>
                <div className='nav-right'> 
                    { this.state.isLoggedIn ? 
                        <NavLink to='/logout' className="nav-link">Logout</NavLink> : 
                        <NavLink to='/login' className="nav-link">Login</NavLink> 
                    }
                </div>

            </div>
        )
    }
}