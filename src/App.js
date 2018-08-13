import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import Login from './components/Login/Login';
import HomePage from './components/HomePage/HomePage';
import FlowPage from './components/FlowPage/FlowPage';
import NewFlowPage from './components/NewFlowPage/NewFlowPage';

import { history } from './helpers/history';
import { PrivateRoute } from './helpers/PrivateRoute';

import './App.css';

// global map state to props
const mapStateToProps = (state, ownProps) => {
  console.log("sttae", state)
  console.log("own props", ownProps);
  return {
    global: state,
  }
}

export const connectedLoginPage = connect(mapStateToProps)(Login);
export const connectedHomePage = connect(mapStateToProps)(HomePage);
export const connectedNewFlowPage = connect(mapStateToProps)(NewFlowPage);
export const connectedFlowPage = connect(mapStateToProps)(FlowPage);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'login',
      views: {
        'login': {},
      },
      isLoggedIn: false,
    }
  }
  render() {
    console.log(this.props)
    return (
      <div className="App">
        <Router history={history}>
          <div>
            <PrivateRoute exact path='/' component={connectedHomePage} />
            <PrivateRoute path='/new' component={connectedNewFlowPage} />
            <PrivateRoute path='/flow' component={connectedFlowPage} />
            <Route path="/login" component={connectedLoginPage} />
          </div>
        </Router>
      </div>
    );
  }
}



export default connect(mapStateToProps)(App);
