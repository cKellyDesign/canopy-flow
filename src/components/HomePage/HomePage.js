import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Grid,
  Row,
} from 'react-bootstrap';
import Header from './../Header/Header';
import SideMenu from './../SideMenu/SideMenu';
import NewFlowPage from '../NewFlowPage/NewFlowPage';
import { mapStateToProps } from '../../helpers/mapStateToProps';
import { getUserForms, fetchFormsError, receiveFormFields } from '../../store/actions';
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    const { dispatch } = this.props;
    dispatch(fetchFormsError(''));
    if (this.state.modal) {
      dispatch(receiveFormFields(null));
    }
    this.setState({
      modal: !this.state.modal,
    });
  }
  async componentWillMount() {
    const { dispatch } = this.props;
    const token = this.props.global.access_token;
    try {
      await dispatch(getUserForms(token));
    } catch(e) {
      return false
    }
  }
  render() {
    return (
      <div>
        <Header />
        <div id="HomePage">
          <SideMenu toggle={this.toggle} />
          <Grid>
            <Row className="main">
            <NewFlowPage toggle={this.toggle} isOpen={this.state.modal}/>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomePage);
