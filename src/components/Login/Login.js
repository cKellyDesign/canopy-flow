import React, { Component } from 'react';
import { history } from '../../helpers/history';

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
    // e.preventDefault();

    const apiBase = 'https://api.ona.io';
    const apiPath = '/o/authorize/';


    const client_id = 'CdJqBZYRVrbpnAu4JoYYFXFPQJa3xWi25oDPqnRY';
    const response_type = 'token';
    const redirect_uri = 'http://localhost:3000/callback';
    const state = 'abc';
    const scope = 'read';
    const url = `${apiBase}${apiPath}?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`
    console.log('authCall - GET ', url);

    const authHeader = new Headers();
    authHeader.append('Access-Control-Allow-Origin', '*')
    authHeader.append('mode', 'no-cors');
    const authConfig = {
      method: 'GET',
      header: authHeader
    }

    const authRequest = new Request(url, authConfig);
    fetch(authRequest)
      .catch(error => console.error('Error:', error))
      .then((res) => {
        return res.json();
      })
      .catch(error => console.error('Error:', error))
      .then((jres) => {
        localStorage.setItem("testingres", jres);
      });

    // fetch(url, {
    //   method: 'GET'
    // }, (res) => {	
    //   window.res = res;
    //   console.log('res', res);
    //   debugger;
    // })
    localStorage.setItem("token_url", window.location.hash);
    this.setState({
      oauthURL: url,
    });
    return true;
    
    // const { username, password } = this;
    // const creds = { username: username.value.trim(), password: password.value.trim() }
    // this.onLoginClick(creds, dispatch);
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
                  <a
                  className="btn btn-primary"
                  onClick={(e) => this.handleClickEvent(e)}
                  href={this.state.oauthURL}>
                  Sign In
                  </a>
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
