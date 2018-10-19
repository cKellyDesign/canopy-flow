// Import Frameworks
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';

// Import components
import Login from './components/Login/Login';
import HomePage from './components/HomePage/HomePage';
import FlowPage from './components/FlowPage/FlowPage';
import NewFlowPage from './components/NewFlowPage/NewFlowPage';
import Callback from './components/Callback/Callback';

// Import helpters
import { history } from './helpers/history';
import { PrivateRoute } from './helpers/PrivateRoute';
import { mapStateToProps } from './helpers/mapStateToProps';

// Import connectors - to do: make these singletons?
import ONA from './connectors/Ona/ona';

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
    };
  }

  render() {
    const { authorizeUser, isDefaultAuthZ } = ONA.Oauth2;
    return (
      <div className="App">
        <Router history={history}>
          <div>
            <PrivateRoute exact path='/' component={connectedHomePage} auth={isDefaultAuthZ} />
            <PrivateRoute path='/new' component={connectedNewFlowPage} auth={isDefaultAuthZ} />
            <PrivateRoute path='/flow/:id' component={connectedFlowPage} auth={isDefaultAuthZ} />
            <Route path="/login" component={connectedLoginPage} />
            <Route
              path='/callback'
              render={() => (
                <Callback 
                  callback={authorizeUser}
                  passURI='/'
                  failURI='/login'
                />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
