import React, { Component } from 'react';

import { 
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import Header from './../Header/Header';

class NewFlowPage extends Component {
  render() {
    return (
      <div id="NewFlowPage">
        <Header />
        <Grid>
          <Row className="main">
            <Col sm={6} md={3}>
              <h3>Flows</h3>
            </Col>
            <Col sm={6} md={9}>
              <h3>Create New Flow</h3>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default NewFlowPage;
