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
import { authorizeUser, loginError } from './../../store/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  onLoginClick(creds, dispatch) {
    return dispatch(authorizeUser(creds));
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
    const { dispatch } = this.props;
    const { triggerSpinner } = this.props.global;
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
                {triggerSpinner &&
                  <img alt="loading..." src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
                </form>
              </Col>
            </Row>
          </Grid>
      </div>
    );
  }
};

export default Login;
