import React, { Component } from 'react';
import { 
  Grid,
  Row,
  Col,
  // FormGroup,
  // ControlLabel,
  // FormControl,
  // Button,
  // HelpBlock,
} from 'react-bootstrap';

import { logoutUser } from './../../store/actions';
import Logout from './../Logout/Logout';

class FlowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flowId: this.props.match.params.id,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      flowId: nextProps.match.params.id,
    });
  }

  render() {
    return (
      <div>
        <Grid>
          <Row className="header">
            <Col sm={12}><h1 className="title">Canopy Flow: Flow View</h1></Col>
          </Row>
          <Row className="main">
            <Col sm={6} md={3}>
              <h3>Flow: {this.state.flowId}</h3>
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

export default FlowPage;
