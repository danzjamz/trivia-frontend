import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import regeneratorRuntime from "regenerator-runtime";
import "regenerator-runtime/runtime";
require("regenerator-runtime/path").path

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faMinus)


import Navigation from './navigation/navigation';
import Login from './pages/user/login';
import ViewTrivia from './pages/trivia/view-trivia';
import { TriviaDetail } from './pages/trivia/trivia-detail';
import NewTrivia from './pages/trivia/new-trivia';
import NewQuestion from './pages/trivia/new-question';
import Home from './pages/home';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Router>
          <Navigation />

          <Switch>
            <Route exact path='/' component={ Home } />
            <Route exact path='/new-trivia/questions' component={ NewQuestion } />
            <Route path='/new-trivia' component={ NewTrivia } />
            <Route path='/my-trivia' component={ ViewTrivia } />
            <Route path='/trivia/:id' component= { TriviaDetail } />

            <Route path='/login' component={ Login } />
          </Switch>

        </Router>
        
      </div>
    );
  }
}