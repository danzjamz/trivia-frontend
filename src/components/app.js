import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import regeneratorRuntime from "regenerator-runtime";
import "regenerator-runtime/runtime";
require("regenerator-runtime/path").path

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faPlusCircle, faMinus, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faPlusCircle, faMinus, faPencilAlt, faTrashAlt)


import Navigation from './navigation/navigation';
import Login from './pages/user/login';
import ViewTrivia from './pages/trivia/view-trivia';
import { TriviaDetail } from './pages/trivia/trivia-detail';
import NewTrivia from './pages/trivia/new-trivia';
import NewQuestion from './pages/trivia/new-question';
import Home from './pages/home';
import StartTrivia from './pages/game/start-trivia';
import PlayQuestions from './pages/game/play-questions';
import Results from './pages/game/results';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Router>
          <Navigation />

          <Switch>
            <Route exact path='/' component={ Home } />
            <Route path='/my-trivia' component={ ViewTrivia } />
            <Route exact path='/new-trivia' component={ NewTrivia } />
            <Route exact path='/trivia/:id' component= { TriviaDetail } />
            <Route exact path='/trivia/:id/edit' component={ NewTrivia } />
            <Route exact path='/trivia/:triviaId/questions' component={ NewQuestion } />
            <Route exact path='/trivia/:triviaId/questions/:questionId/edit' component={ NewQuestion } />

            <Route exact path='/trivia/:id/play' component={ StartTrivia } />
            <Route path='/trivia/:id/play/questions' component={ PlayQuestions } />
            <Route path='/trivia/:id/play/results' component={ Results } />

            <Route path='/login' component={ Login } />
            <Route path='/register' component={ Login } />
          </Switch>

        </Router>
        
      </div>
    );
  }
}