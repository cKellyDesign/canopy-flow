import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Grid,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import Header from './../Header/Header';
import { mapStateToProps } from '../../helpers/mapStateToProps';
import { getUserForms } from '../../store/actions';
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentWillMount() {
    const { dispatch } = this.props;
    const { user } = this.props.global;
    await dispatch(getUserForms(user));
  }
  render() {
    console.log("globalllll", this.props.global.forms);
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

export default connect(mapStateToProps)(HomePage);
