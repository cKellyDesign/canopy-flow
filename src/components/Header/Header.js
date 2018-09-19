import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';

import Logout from './../Logout/Logout';
import { mapStateToProps } from './../../helpers/mapStateToProps';
import ONA from './../../connectors/Ona/ona';

class Header extends Component {
  render() {
    return (
      <div className="header-wrapper">
        <Grid>
          <Row className="header">
            <Col sm={12} md={10}>
              <Link to="/">
                <h1 className="title">Canopy Flow</h1>
              </Link>
            </Col>
            <Col sm={2} >
              <Logout onLogoutClick={() => { ONA.Oauth2.defaultDeAuthZ(this.props.dispatch); }} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Header);
