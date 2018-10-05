import React, { Component } from 'react';
import { Modal, Glyphicon } from 'react-bootstrap';
import { Button, Table, Container, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AsyncSelect from "react-select/lib/Async";
import Actions from '../../store/actions';
import { mapStateToProps } from '../../helpers/mapStateToProps';
import './NewFlowPage.css';

const APPS = [
  "ONA",
  "OpenSRP",
  "Kobo",
  "CommCare",
  "Excel"
]; // Move this to config file/constants file/default state

const PROGRAMS = [
  {label: "Program 1", value: "1"},
  {label: "Program 2", value: "2"},
  {label: "Program 3", value: "3"},
  {label: "Program 4", value: "4"},
  {label: "Program 5", value: "5"},
  {label: "Program 6", value: "6"}
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
    this.handleBlur = this.handleBlur.bind(this);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.loadFormOptions = this.loadFormOptions.bind(this);
    this.loadProgramOptions = this.loadProgramOptions.bind(this);
    this.buildFormFieldsMap = this.buildFormFieldsMap.bind(this);
    this.onFieldClick = this.onFieldClick.bind(this);
    this.toggleAllFields = this.toggleAllFields.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.global && nextProps.global.fields) {
      this.setState({
        fields: this.buildFormFieldsMap(nextProps.global.fields)
      });
    }
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

  handleBlur(e) {
    e.preventDefault();
  }

  buildFormFieldsMap(fields) {
    let fieldsMap;
    const fieldsOptionsMap = {};
    let field;
    let fieldName;

    for(let x = 0; x < fields.length; x += 1) {
      field = fields[x];
      fieldName = field.name;
      if (!fieldsOptionsMap[fieldName]) {
        fieldsOptionsMap[fieldName] = {
          ...field,
          enabled: false
        };
      }
    }
    fieldsMap = {
      toggleAllOn: false,
      options: {
        ...fieldsOptionsMap
      }
    };
    return fieldsMap;
  }

  onFieldClick(e) {
    e.stopPropagation();
    const { fields } = this.state;
    const nextFields = fields;
    nextFields.options[e.target.value].enabled = !fields.options[e.target.value].enabled;
    nextFields.toggleAllOn = Object.keys(nextFields.options).every(e => nextFields.options[e].enabled)
    this.setState({
      fields: nextFields,
    });
  }

  toggleAllFields(e) {
    e.stopPropagation();
    const { fields } = this.state;
    const nextFields = fields;
    nextFields.toggleAllOn = !fields.toggleAllOn;
    Object.keys(nextFields.options).forEach(d => {
      nextFields.options[d].enabled = nextFields.toggleAllOn;
    });
    this.setState({
      fields: nextFields
    });
  }

  handlePreviousButton() {
    // TO DO: move this logic to redux state
    if (this.state.selectSourceStage && !this.state.selectDataStage) {
      this.setState({
        disabledPrevBtn: true,
        selectDataStage: false,
        selectSourceStage: true,
        finalizeStage: false,
      });
    } else if (!this.state.selectSourceStage && this.state.selectDataStage) {
      this.setState({
        disabledPrevBtn: true,
        selectDataStage: false,
        selectSourceStage: true,
        finalizeStage: false
      });
    } else if (this.state.finalizeStage && (!this.state.selectDataStage && !this.state.selectSourceStage)) {
      this.setState({
        disabledPrevBtn: false,
        disabledNextBtn: false,
        selectDataStage: true,
        selectSourceStage: false,
        finalizeStage: false
      });
    } else {
      this.setState({
        disabledPrevBtn: true,
        selectDataStage: false,
        selectSourceStage: true,
        finalizeStage: false,
      });
    }
  }

  handleNextButton() {
    // TO DO: move this logic to redux state
    if (this.state.selectSourceStage && !this.state.selectDataStage) {
      this.setState({
        disabledNextBtn: false,
        disabledPrevBtn: !this.state.selectSourceStage && this.state.selectDataStage,
        selectDataStage: true,
        selectSourceStage: false,
      });
    } else if (!this.state.selectSourceStage && this.state.selectDataStage) {
      this.setState({
        disabledNextBtn: true,
        disabledPrevBtn: !this.state.selectSourceStage && !this.state.selectDataStage,
        selectDataStage: false,
        selectSourceStage: false,
        finalizeStage: true,
      });
    }
  }

  getFormOptions() {
    const { forms } = this.props.global;
    return forms && forms.map(d => {
      return {
        label: d.title,
        value: d.formid
      }
    });
  }

  loadFormOptions(inputValue, callback) {
    const formOptions = this.getFormOptions();
    setTimeout(() => {
      callback(
        formOptions.filter(f => f.label.toLowerCase().includes(inputValue.toLowerCase()))
      )
    }, 10);
  }

  loadProgramOptions(inputValue, callback) {
    setTimeout(() => {
      callback(
        PROGRAMS.filter(p => p.label.toLowerCase().includes(inputValue.toLowerCase()))
      )
    }, 10);
  }

  async handleFormSelect(e) {
    const { dispatch } = this.props;
    if (!e) {
      dispatch(Actions.receiveFormFields(null));
      this.setState({
        selectedForm: null,
        fields: null,
      });
      return false
    }
    this.setState({
      selectedForm: {
        label: e.label,
        value: e.value,
      },
    });
    const formid = e.value;
    const token = this.props.global.access_token;
    try {
      await dispatch(Actions.getFormFields(token, formid))
    } catch (e) {
      return false
    }
  }

  render() {
    const { fields } = this.state;
    console.log("props", this.props.global)
    console.log("state", this.state);
    const appBuilder = APPS.map(a => (
      <Link key={a} data-key={a} onClick={(e) => this.handleAppClick(e)} to="" className="app-link">
        <span className="app-icon">
          <img alt="Loading..." src="img/rapidpro_ona.png" className={`${this.state.selectedApp === a ? 'active' : ''}`} />
          <span>{a}</span>
        </span>
      </Link>
    ));

    const fieldsList = fields && Object.keys(fields.options).map((f, i) => (
      <tr key={i}>
        <td>
          <input
            type="checkbox"
            value={fields.options[f].name}
            checked={fields.options[f].enabled}
            onChange={(e) => this.onFieldClick(e)}
          />
        </td>
        <td>
          <div className="data-type">
            <div>
            {fields.options[f].type}
            </div>
          </div>
        </td>
        <td>
          {typeof fields.options[f].label === 'string' ? (fields.options[f].label || fields.options[f].name) : fields.options[f].label.English}
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
                    <span className={`${this.state.selectDataStage || this.state.finalizeStage ? 'success' : this.state.selectSourceStage ? 'active' : ''}`}>
                      {(this.state.selectDataStage || this.state.finalizeStage) && <Glyphicon glyph='ok'/>}
                    </span>
                  </a>
                </li>
                <li className="divider"></li>
                <li>
                  <a>
                  <span className={`${this.state.finalizeStage ? 'success' : this.state.selectDataStage ? 'active' : ''}`}>
                      {this.state.finalizeStage && <Glyphicon glyph='ok'/>}
                    </span>
                  </a>
                </li>
                <li className="divider"></li>
                <li>
                  <a>
                    <span className={`${this.state.finalizeStage ? 'active' : ''}`}/>
                  </a>
                </li>
              </ul>
            </div>
            <Row className="stage-description-row">
              <Col md={{ size: 4 }}>
                {`${this.state.selectSourceStage ? 'Select Source' : ''}`}
              </Col>
              <Col md={{ size: 4 }}>
              {`${this.state.selectDataStage ? 'Select Data' : ''}`}
              </Col>
              <Col md={{ size: 4 }}>
              {`${this.state.finalizeStage ? 'Finalize' : ''}`}
              </Col>
            </Row>
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
                      <AsyncSelect
                        name="programs"
                        placeholder="Select Porgram"
                        isClearable
                        cacheOptions
                        handleBlur={(e) => this.handleBlur(e)}
                        loadOptions={this.loadProgramOptions}
                        defaultOptions={PROGRAMS}
                      />
                    </Col>
                    <Col md="6">
                      <Label>Fields</Label><br />
                      <div className="fields-wrapper">
                        <Table borderless>
                          <thead>
                            <tr>
                              <th>
                                <input
                                  type="checkbox"
                                  checked={fields.toggleAllOn}
                                  onChange={(e) => this.toggleAllFields(e)}
                                />
                              </th>
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
                      <AsyncSelect
                        name="forms"
                        placeholder="Select Form"
                        value={this.state.selectedForm || ''}
                        defaultOptions={this.getFormOptions()}
                        isClearable
                        cacheOptions
                        onChange={(e) => this.handleFormSelect(e)}
                        handleBlur={(e) => this.handleBlur(e)}
                        loadOptions={this.loadFormOptions}
                      />
                    </Col>
                  </Row>
                </Container> : this.state.finalizeStage ?
                <Container fluid>
                    <Row>Final Stage</Row>
                </Container>
                : ''}
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
