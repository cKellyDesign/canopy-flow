// Import Frameworks
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';

// Import components
import Login from './components/Login/Login';
import HomePage from './components/HomePage/HomePage';
import FlowPage from './components/FlowPage/FlowPage';
import NewFlowPage from './components/NewFlowPage/NewFlowPage';

// Import helpters
import { history } from './helpers/history';
import { PrivateRoute } from './helpers/PrivateRoute';
import { mapStateToProps } from './helpers/mapStateToProps';

// Import styling
import './App.css';

// Connect Components to the Store
const connectedLoginPage = connect(mapStateToProps)(Login);
const connectedHomePage = connect(mapStateToProps)(HomePage);
const connectedNewFlowPage = connect(mapStateToProps)(NewFlowPage);
const connectedFlowPage = connect(mapStateToProps)(FlowPage);

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
    return (
      <div className="App">
        <Router history={history}>
          <div>
            <PrivateRoute exact path='/' component={connectedHomePage} />
            <PrivateRoute path='/new' component={connectedNewFlowPage} />
            <PrivateRoute path='/flow/:id' component={connectedFlowPage} />
            <Route path="/login" component={connectedLoginPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
