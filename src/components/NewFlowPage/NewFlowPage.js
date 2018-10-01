import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Button, Table } from 'reactstrap';
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
      disabled: true,
    };
    this.handleAppClick = this.handleAppClick.bind(this);
    this.handlePreviousButton = this.handlePreviousButton.bind(this);
    this.handleFormSelect = this.handleFormSelect.bind(this);
  }

  handleAppClick(e) {
    const appName = e.currentTarget.getAttribute('data-key');
    this.setState({
      ...this.state,
      selectedApp: appName,
      selectSourceStage: false,
      selectDataStage: true,
      disabled: false,
    });
  }

  handlePreviousButton() {
    if (this.state.selectSourceStage && !this.state.selectDataStage) {
      this.setState({
        disabled: true,
        selectDataStage: false,
        selectSourceStage: true,
      });
    } else if (!this.state.selectSourceStage && this.state.selectDataStage) {
      this.setState({
        disabled: true,
        selectDataStage: false,
        selectSourceStage: true,
      });
    } else {
      this.setState({
        disabled: true,
        selectDataStage: false,
        selectSourceStage: true
      });
    }
  }

  async handleFormSelect(e) {
    const { dispatch } = this.props;
    const formid = e.target.value;
    this.setState({
      selectedForm: e.target.getAttribute('data-form-name'),
    });
    const token = this.props.global.access_token;
    try {
      await dispatch(getFormFields(token, formid))
    } catch(e) {
      return false
    }
  }

  render() {
    console.log("state", this.state)
    const { forms } = this.props.global;
    console.log("fileds", this.props.global);
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
           <div className="data-section">
           <div className="programs-list">
           <select>
           `<option value="" disabled selected>Select Program</option>
             <option>test</option>
             <option>test</option>
             <option>test</option>
             <option>test</option>
             <option>test</option>
             <option>test</option>
           </select>
           </div>
           <div className="forms-list">
           <select onChange={(e) => this.handleFormSelect(e)}>
            <option value="" disabled selected>Select Form</option>
             {formsList}
           </select>
           </div>
           </div> : ''}
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={this.state.disabled} onClick={this.handlePreviousButton}>PREVIOUS</Button>
            <Button onClick={this.props.toggle}>NEXT</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(NewFlowPage);
