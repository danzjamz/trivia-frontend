import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import logout from '../pages/user/logout';

export default class Navigation extends Component {
    constructor() {
        super();

        this.state = {
            isToggle: true,
            navActiveClass: '',
            user: this.setUser()
        }
    }

    setUser = () => {
        // get user from local storage
        if (localStorage.user == undefined) {
            return null;
        } else {
            return localStorage.user;
        }
    }

    login = () => {
        // temp until global state and hooks
        setTimeout(() => {
            const user = localStorage.user;
            if (user !== null)
                this.setState({ user: user })
        }, 10000)
        this.toggleBurger()
    }

    logout = () => {
        this.toggleBurger()
        logout(this.state.user)
            .then(res => {
                console.log(res);
                if (res) {
                    this.setState({ user: null});
                }
            });
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
                    <NavLink 
                        exact to='/' 
                        className="nav-link" 
                        activeClassName='active-nav-link' 
                        onClick={ this.toggleBurger }>
                            Home
                    </NavLink>
                    <NavLink 
                        to='/new-trivia'className="nav-link" 
                        activeClassName='active-nav-link' 
                        onClick={ this.toggleBurger }>
                            New Trivia
                    </NavLink>
                    <NavLink 
                        to='/my-trivia'className="nav-link"
                        activeClassName='active-nav-link' 
                        onClick={ this.toggleBurger }>
                            My Trivia
                    </NavLink>

                </div>
                <div className='nav-right'>
                    { this.state.user ? 
                        <NavLink 
                            to='/' 
                            onClick={ () => this.logout() } 
                            className="nav-link">
                                Logout
                        </NavLink> : 
                        <div>
                            <NavLink 
                                to='/login' 
                                className="nav-link" 
                                activeClassName='active-nav-link' 
                                onClick={ this.login }>
                                    Login
                            </NavLink> 
                            <NavLink 
                                to='/register' 
                                className="nav-link" 
                                activeClassName='active-nav-link' 
                                onClick={ this.login }>
                                    Signup
                            </NavLink> 
                        </div>
                    }
                </div>

            </div>
        )
    }
}