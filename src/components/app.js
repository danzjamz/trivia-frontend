import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navigation from './navigation/navigation';
import { Home } from './home';
import { NewTrivia } from './pages/trivia/new-trivia';
import { TriviaDetail } from './pages/trivia/trivia-detail';
import { Login } from './pages/user/login';
import ViewTrivia from './pages/trivia/view-trivia';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Router>
          <Navigation />

          <Switch>
            <Route exact path='/' component={ Home } />
            <Route path='/new-trivia' component={ NewTrivia } />
            <Route path='/my-trivia' component={ ViewTrivia } />
            <Route path='/trivia-detail/:id' component= { TriviaDetail } />

            <Route path='/login' component={ Login } />
          </Switch>

        </Router>
        
      </div>
    );
  }
}