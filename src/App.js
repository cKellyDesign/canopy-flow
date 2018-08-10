import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { history } from './helpers/history';
import { PrivateRoute } from './helpers/PrivateRoute';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap';
import './App.css';
import { loginUser, logoutUser } from './store/actions';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

const mapStateToProps = (state, ownProps) => {
  console.log("sttae", state)
  console.log("own props", ownProps);
  return {
    global: state,
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};  
  }

  onLoginClick(creds, dispatch) {
    return dispatch(loginUser(creds));
  }

  handleClickEvent(e, dispatch) {
    e.preventDefault();
    const { username, password } = this;
    const creds = { username: username.value.trim(), password: password.value.trim() }
    this.onLoginClick(creds, dispatch);
  }

  render() {
    console.log("props", this.props);
    const { dispatch } = this.props;
    return (
      <div>
        <form>
          <FormGroup>
            <FormControl
              id="username"
              inputRef={ref => { this.username = ref; }}
              type="text"
              label="Username"
              placeholder="Enter Username"
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              id="password"
              inputRef={ref => {this.password = ref; }}
              type="password"
              label="Password"
              placeholder="Enter Password"
            />
          </FormGroup>
          <Button
          bsStyle="primary"
          bsSize="lg"
          type="submit"
          onClick={(e) => this.handleClickEvent(e, dispatch)}>Sign In</Button>
          {this.props && this.props.errorMessage ? 
          <p>{this.props.errorMessage}</p>
        : null}
        </form>
      </div>
    );
  }
};

class Logout extends Component {
  render() {
    const { onLogoutClick } = this.props;
    return (
      <div>
       <Button
          bsStyle="primary"
          bsSize="lg"
          onClick={() => onLogoutClick()}
          >Sign Out</Button>
      </div>
    );
  }
}

class HomePage extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row className="header">
            <Col sm={12}><h1 className="title">Canopy Flow</h1></Col>
          </Row>
          <Row className="main">
            <Col sm={6} md={3}>
              <h3>Flows</h3>
            </Col>
            <Col sm={6} md={9}>
              <h3>Flow Details</h3>
            </Col>
          </Row>
          <Row>
            <Logout
              onLogoutClick={() => this.props.dispatch(logoutUser())}
            />
          </Row>
        </Grid>
      </div>
    );
  }
}

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
            <Route path="/login" component={connectedLoginPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export const connectedHomePage = connect(mapStateToProps)(HomePage);
export const connectedLoginPage = connect(mapStateToProps)(Login);

export default connect(mapStateToProps)(App);
