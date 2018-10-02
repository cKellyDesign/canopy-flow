import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Button, Table, Container, Row, Col, Label, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFormFields } from '../../store/actions';
import { mapStateToProps } from '../../helpers/mapStateToProps';
import './NewFlowPage.css';

const APPS = [
  "ONA",
  "OpenSRP",
  "Kobo",
  "CommCare",
  "Excel"
]; // Move this to config file/constants file/default state

class NewFlowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedApp: 'ONA',
      selectSourceStage: true,
      selectDataStage: false,
      finalizeStage: false,
      disabledPrevBtn: true,
      disabledNextBtn: false,
      selectedForm: null
    };
    this.handleAppClick = this.handleAppClick.bind(this);
    this.handlePreviousButton = this.handlePreviousButton.bind(this);
    this.handleFormSelect = this.handleFormSelect.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
  }

  handleAppClick(e) {
    const appName = e.currentTarget.getAttribute('data-key');
    this.setState({
      ...this.state,
      selectedApp: appName,
      selectSourceStage: false,
      selectDataStage: true,
      disabledPrevBtn: false,
      disabledNextBtn: false,
    });
  }

  handlePreviousButton() {
    if (this.state.selectSourceStage && !this.state.selectDataStage) {
      this.setState({
        disabledPrevBtn: true,
        selectDataStage: false,
        selectSourceStage: true,
      });
    } else if (!this.state.selectSourceStage && this.state.selectDataStage) {
      this.setState({
        disabledPrevBtn: true,
        selectDataStage: false,
        selectSourceStage: true,
      });
    } else {
      this.setState({
        disabledPrevBtn: true,
        selectDataStage: false,
        selectSourceStage: true
      });
    }
  }

  handleNextButton() {
    if (this.state.selectSourceStage && !this.state.selectDataStage) {
      this.setState({
        disabledNextBtn: false,
        disabledPrevBtn: !this.state.selectSourceStage && this.state.selectDataStage,
        selectDataStage: true,
        selectSourceStage: false,
      });
    }
  }

  async handleFormSelect(e) {
    const { dispatch } = this.props;
    const formid = e.target.value;
    const selectedIndex = e.target.options.selectedIndex;
    const formName = e.target.options[selectedIndex].getAttribute('data-form-name');
    this.setState({
      selectedForm: formName,
    });
    const token = this.props.global.access_token;
    try {
      await dispatch(getFormFields(token, formid))
    } catch (e) {
      return false
    }
  }

  render() {
    console.log("state", this.state)
    console.log('props', this.props.global)
    const { forms, fields } = this.props.global;
    const appBuilder = APPS.map(a => (
      <Link key={a} data-key={a} onClick={(e) => this.handleAppClick(e)} to="" className="app-link">
        <span className="app-icon">
          <img alt="Loading..." src="img/rapidpro_ona.png" className={`${this.state.selectedApp === a ? 'active' : ''}`} />
          <span>{a}</span>
        </span>
      </Link>
    ));

    const formsList = forms && forms.map((f, i) => (
      <option key={i} data-form-name={f.title} value={f.formid}>{f.title}</option>
    ));

    const fieldsList = fields && fields.map((f, i) => (
      <tr key={i}>
        <td>
          <input type="checkbox" />
        </td>
        <td>
          {f.type}
        </td>
        <td>
          {f.name}
        </td>
      </tr>
    ));
    return (
      <div className="static-modal">
        <Modal show={this.props.isOpen} onHide={this.props.toggle}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Flow</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="selection-breadcrumb">
              <ul className="horizontal-steps">
                <li>
                  <a>
                    <span />
                  </a>
                </li>
                <li className="divider"></li>
                <li>
                  <a>
                    <span />
                  </a>
                </li>
                <li className="divider"></li>
                <li>
                  <a>
                    <span />
                  </a>
                </li>
              </ul>
            </div>
            <hr />
            {this.state.selectSourceStage ?
              <div className="apps-section">
                <div>
                  {appBuilder}
                </div>
              </div> : this.state.selectDataStage ?
                <Container fluid>
                  {this.props.global.formsError.length > 0 &&
                    <Row>
                      <div className="alert alert-danger" role="alert">
                        {this.props.global.formsError}
                      </div>
                    </Row>}
                  <Row>
                    <Col md="6">
                      <Label>Programs</Label><br />
                      <select className="programs">
                        `<option value="" disabled selected>Select Program</option>
                        <option>test</option>
                        <option>test</option>
                        <option>test</option>
                        <option>test</option>
                        <option>test</option>
                        <option>test</option>
                      </select>
                    </Col>
                    <Col md="6">
                      <Label>Fields</Label><br />
                      <div className="fields-wrapper">
                        <Table borderless>
                          <thead>
                            <tr>
                              <th><input type="checkbox" /></th>
                              <th>Type</th>
                              <th>Field Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {fieldsList}
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="forms-column">
                      <Label>Forms</Label><br />
                      <select onChange={(e) => this.handleFormSelect(e)} className="forms">
                        <option value="" disabled selected>Select Form</option>
                        {formsList}
                      </select>
                    </Col>
                  </Row>
                </Container> : ''}
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={this.state.disabledPrevBtn} onClick={this.handlePreviousButton}>PREVIOUS</Button>
            <Button disabled={this.state.disabledNextBtn} onClick={this.handleNextButton}>NEXT</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(NewFlowPage);
