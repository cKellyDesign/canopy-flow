import React, { Component } from 'react';

import { 
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  Button,
  Alert,
} from 'react-bootstrap';
import { loginUser, loginError } from './../../store/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
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

  handleDismiss(e, dispatch) {
    e.preventDefault();
    dispatch(loginError(null))
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    console.log("props", this.props);
    const { dispatch } = this.props;
    return (
      <div>
        <Grid>
            <Row className="header">
              <Col sm={6} xsOffset={3}><h1 className="title">Login</h1></Col>
            </Row>
            <Row className="main">
            {this.props.global.errorMessage ?
            <Col sm={6} xsOffset={3}>
            <Alert bsStyle="danger" onDismiss={(e) => this.handleDismiss(e, dispatch)}>
              <p>
              {this.props.global.errorMessage}
              </p>
            </Alert>
            </Col> : null}
              <Col sm={6} xsOffset={3}>
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
              </Col>
            </Row>
          </Grid>
      </div>
    );
  }
};

export default Login;
