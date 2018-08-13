import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { 
  Grid,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import Header from './../Header/Header';

class HomePage extends Component {
  render() {
    return (
      <div id="HomePage">
        <Header />
        <Grid>
          <Row className="main">
            <Col sm={6} md={3}>
              <h3>Flows</h3>
            </Col>
            <Col sm={6} md={9}>
              <h3>Call to Actions</h3>
              <Link to="/new"><Button>Create New Flow</Button></Link>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default HomePage;
