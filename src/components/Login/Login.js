import React, { Component } from 'react';
import { 
  Grid,
  Row,
  Col,
  Alert,
} from 'react-bootstrap';
import { loginError } from './../../store/actions';
import ONA from './../../connectors/Ona/ona';

class Login extends Component {
  constructor(props) {
    super(props);

    // todo - decrypt oauthUrl info?
    const client_id = 'CdJqBZYRVrbpnAu4JoYYFXFPQJa3xWi25oDPqnRY';
    const redirect_uri = `${window.location.origin}/callback`;

    this.state = {
      show: false,
      oauthURL: ONA.Oauth2.getOauthURL(client_id, redirect_uri),
    };
  }

  // componentWillMount() {
  //   const { userInfo } = this.props.global;
  //   if (userInfo) {
  //     history.replace('/');
  //   }
  // }

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
                  <a
                    className="btn btn-lg btn-primary"
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
