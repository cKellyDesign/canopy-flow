import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap';
import './App.css';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class Login extends Component {
  render() {
    return (
      <div>
        <form>
          <FieldGroup
            id="username"
            type="text"
            label="Username"
            placeholder="Enter Username"
          />
          <FieldGroup
            id="password"
            type="password"
            label="Password"
            placeholder="Enter Password"
          />
          <Button bsStyle="primary" bsSize="lg" type="submit">Sign In</Button>
        </form>
      </div>
    );
  }
};

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
        {!this.state.isLoggedIn ? (
          <Grid>
            <Row>
              <Col sm={12} md={4} mdOffset={4}>
                <div className="login">
                  <h1>Log In</h1>
                  <Login />
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
          </Grid>
        )}
      </div>
    );
  }
}

export default App;
