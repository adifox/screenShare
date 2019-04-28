import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import Home from './container/home';
import Profile from './container/profile';
import Login from './components/login';
import Register from './components/register';
import Image from './components/image';
import Test from './components/testSector';

class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route path='/login' component={ Login } />
        <Route path='/profile' component={ Profile } />
        <Route path='/register' component={ Register } />
        <Route path='/image' component={ Image } />
        <Route path='/test' component={ Test } />
      </Switch>
    </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(App);