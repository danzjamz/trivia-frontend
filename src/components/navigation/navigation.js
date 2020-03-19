import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import logout from '../pages/user/logout';

export default class Navigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isToggle: true,
            navActiveClass: '',
            user: this.setUser(),
            isLoggedIn: false
        }
    }

    componentDidMount() {
        if (this.state.user) {
            this.setState({ isLoggedIn: true })
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
        
        const user = localStorage.user;
        if (user) {
            this.setState({ user: user, isLoggedIn: true })
        }
        
        this.toggleBurger()
    }

    logout = () => {
        this.toggleBurger()
        logout(this.state.user)
            .then(res => {
                console.log(res);
                if (res) {
                    this.setState({ user: null, isLoggedIn: false });
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
                    { this.state.isLoggedIn ? 
                        <NavLink 
                            to='/' 
                            onClick={ () => this.logout() } 
                            className="nav-link">
                                Logout
                        </NavLink> : 
                        <div>
                            <NavLink 
                                to={{ pathname: '/login', login: this.login }}
                                className="nav-link" 
                                activeClassName='active-nav-link'>
                                    Login
                            </NavLink> 
                            <NavLink 
                                to={{ pathname: '/register', login: this.login }}
                                className="nav-link" 
                                activeClassName='active-nav-link'>
                                    Signup
                            </NavLink> 
                        </div>
                    }
                </div>

            </div>
        )
    }
}