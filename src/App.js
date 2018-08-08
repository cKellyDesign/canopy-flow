import React, { Component } from 'react';
import { connect } from 'react-redux';
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

  handleClickEvent(e) {
    e.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    const creds = { username: username.value.trim(), password: password.value.trim() }
    this.props.onLoginClick(creds)
  }

  render() {
    return (
      <div>
        <form>
          <FormGroup>
            <FormControl
              id="username"
              ref="username"
              type="text"
              label="Username"
              placeholder="Enter Username"
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              id="password"
              ref="password"
              type="password"
              label="Password"
              placeholder="Enter Password"
            />
          </FormGroup>
          <Button
            bsStyle="primary"
            bsSize="lg"
            type="submit"
            onClick={(e) => this.handleClickEvent(e)}
          >Sign In</Button>
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
        {!this.props.global.isAuthenticated ? (
          <Grid>
            <Row>
              <Col sm={12} md={4} mdOffset={4}>
                <div className="login">
                  <h1>Log In</h1>
                  <Login
                    onLoginClick={creds => this.props.dispatch(loginUser(creds))}
                    errorMessage={this.props.global.errorMessage}
                  />
                </div>
              </Col>
            </Row>
          </Grid>
        ) : (
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
          )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
