import React, { Component } from 'react';

import { 
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import Header from './../Header/Header';

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
      <div id="FlowPage">
        <Header />
        <Grid>
          <Row className="main">
            <Col sm={6} md={3}>
              <h3>Flows</h3>
            </Col>
            <Col sm={6} md={9}>
              <h3>Flow View: {this.state.flowId}</h3>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default FlowPage;
