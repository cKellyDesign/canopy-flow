import React from 'react';
import moment from 'moment';
import { Modal, Glyphicon } from 'react-bootstrap';
import {
  Button, Table, Container, Row, Col, Label,
} from 'reactstrap';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/lib/Async';
import Actions from '../../store/actions';
import { mapStateToProps } from '../../helpers/mapStateToProps';
import './NewFlowPage.css';

const APPS = [
  { appName: 'ONA', disabled: false },
  { appName: 'OpenSRP', disabled: true },
  { appName: 'Kobo', disabled: true },
  { appName: 'CommCare', disabled: true },
  { appName: 'Excel', disabled: true },
]; // Move this to config file/constants file/default state

class NewFlowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedApp: 'ONA',
      selectSourceStage: true,
      selectDataStage: false,
      finalizeStage: false,
      disabledPrevBtn: true,
      disabledNextBtn: false,
      selectedForm: null,
      selectedProgram: null,
      newFlowName: null,
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
    this.handleProgramSelect = this.handleProgramSelect.bind(this);
    this.handleSaveFlow = this.handleSaveFlow.bind(this);
    this.handleFlowNameInput = this.handleFlowNameInput.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.global && nextProps.global.fields) {
      this.setState({
        fields: this.buildFormFieldsMap(nextProps.global.fields),
      });
    }
  }

  handleAppClick(e) {
    const appName = e.currentTarget.getAttribute('data-key');
    const { dispatch } = this.props;
    dispatch(Actions.handleNextStep(false, false, true, false, false));
    this.setState({
      ...this.state,
      selectedApp: appName,
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSaveFlow();
    }
  }

  handleBlur(e) {
    e.preventDefault();
  }

  handleFlowNameInput(e) {
    this.setState({
      newFlowName: e.target.value,
    });
  }

  handleSaveFlow() {
    const { dispatch } = this.props;
    const { newFlowName } = this.state;
    const { fields, project } = this.props.global;
    const flowDets = {
      fields: (fields && [...fields]) || [],
      project: project || null,
      form: newFlowName && !!newFlowName.length ? newFlowName : ((this.state.selectedForm && this.state.selectedForm.label) || null),
      status: true,
      no_of_submissions: (this.state.selectedForm && this.state.selectedForm.no_of_submissions),
      last_submission_time: (this.state.selectedForm && this.state.selectedForm.last_submission_time),
    };

    dispatch(Actions.saveFlow(flowDets));
    dispatch(Actions.handleNextStep(true, true, false, false, false));
    this.setState({
      selectedApp: 'ONA',
      selectedForm: null,
      selectedProgram: null,
    }, () => {
      this.props.toggle();
    });
  }

  buildFormFieldsMap(fields) {
    let fieldsMap;
    const fieldsOptionsMap = {};
    let field;
    let fieldName;

    for (let x = 0; x < fields.length; x += 1) {
      field = fields[x];
      fieldName = field.name;
      if (!fieldsOptionsMap[fieldName]) {
        fieldsOptionsMap[fieldName] = {
          ...field,
          enabled: false,
        };
      }
    }
    fieldsMap = {
      toggleAllOn: false,
      options: {
        ...fieldsOptionsMap,
      },
    };
    return fieldsMap;
  }

  onFieldClick(e) {
    e.stopPropagation();
    const { fields } = this.state;
    const nextFields = fields;
    nextFields.options[e.target.value].enabled = !fields.options[e.target.value].enabled;
    nextFields.toggleAllOn = Object.keys(nextFields.options).every(e => nextFields.options[e].enabled);
    this.setState({
      nextFields,
    });
  }

  toggleAllFields(e) {
    e.stopPropagation();
    const { fields } = this.state;
    const nextFields = fields;
    nextFields.toggleAllOn = !fields.toggleAllOn;
    Object.keys(nextFields.options).forEach((d) => {
      nextFields.options[d].enabled = nextFields.toggleAllOn;
    });
    this.setState({
      nextFields,
    });
  }

  handlePreviousButton() {
    const { dispatch } = this.props;
    const { stepsState } = this.props.global;
    if (stepsState.selectSourceStage && !stepsState.selectDataStage) {
      dispatch(Actions.handleNextStep(true, true, false, false, false));
    } else if (!stepsState.selectSourceStage && stepsState.selectDataStage) {
      dispatch(Actions.handleNextStep(true, true, false, false, false));
    } else if (stepsState.finalizeStage && (!stepsState.selectDataStage && !stepsState.selectSourceStage)) {
      dispatch(Actions.handleNextStep(false, false, true, false, false));
    } else {
      dispatch(Actions.handleNextStep(true, true, false, false, false));
    }
  }

  handleNextButton() {
    const { dispatch } = this.props;
    const { stepsState } = this.props.global;
    if (stepsState.selectSourceStage && !stepsState.selectDataStage) {
      dispatch(Actions.handleNextStep(false, false, true, false, false));
    } else if (!stepsState.selectSourceStage && stepsState.selectDataStage) {
      dispatch(Actions.handleNextStep(false, false, false, true, false));
    }
  }

  getFormOptions() {
    const { project } = this.props.global;
    return project && project.forms && project.forms
      .filter(d => d.downloadable)
      .map(d => ({
        label: d.name,
        value: d.formid,
        no_of_submissions: d.num_of_submissions,
        last_submission_time: d.last_submission_time,
      }));
  }

  getProjectOptions() {
    const { projects } = this.props.global;
    return projects && projects.map(d => ({
      label: d.name,
      value: d.projectid,
    }));
  }

  loadFormOptions(inputValue, callback) {
    const formOptions = this.getFormOptions();
    setTimeout(() => {
      callback(
        formOptions.filter(f => f.label.toLowerCase().includes(inputValue.toLowerCase())),
      );
    }, 1000);
  }

  loadProgramOptions(inputValue, callback) {
    const programOptions = this.getProjectOptions();
    setTimeout(() => {
      callback(
        programOptions.filter(p => p.label.toLowerCase().includes(inputValue.toLowerCase())),
      );
    }, 1000);
  }

  async handleFormSelect(e) {
    const { dispatch } = this.props;
    if (!e) {
      dispatch(Actions.receiveFormFields(null));
      this.setState({
        selectedForm: null,
        fields: null,
      });
      return false;
    }
    this.setState({
      selectedForm: {
        label: e.label,
        value: e.value,
        no_of_submissions: e.no_of_submissions,
        last_submission_time: moment(new Date(e.last_submission_time).getTime()).fromNow(),
      },
    });
    const formid = e.value;
    const token = this.props.global.access_token;
    try {
      await dispatch(Actions.getFormFields(token, formid));
    } catch (e) {
      return false;
    }
    return true;
  }

  async handleProgramSelect(e) {
    const { dispatch } = this.props;
    if (!e) {
      dispatch(Actions.receiveProject(null));
      this.setState({
        selectedProgram: null,
      });
      return false;
    }
    this.setState({
      selectedProgram: {
        label: e.label,
        value: e.value,
      },
    });
    const projectid = e.value;
    const token = this.props.global.access_token;
    try {
      await dispatch(Actions.getProject(token, projectid));
    } catch (e) {
      return false;
    }
    return true;
  }

  render() {
    const { nextFields, fields } = this.state;
    const { stepsState } = this.props.global;
    const appBuilder = APPS.map(a => (
      <Button key={a.appName} data-key={a.appName} onClick={e => this.handleAppClick(e)} className={`app-link ${a.disabled ? 'disabled' : ''}`} disabled={a.disabled}>
        <span className="app-icon">
          <img alt="Loading..." src="img/rapidpro_ona.png" className={`${this.state.selectedApp === a.appName ? 'active' : ''}`} />
          <span>{a.appName}</span>
        </span>
      </Button>
    ));

    const fieldsList = (nextFields || fields) && Object.keys((nextFields && nextFields.options) || (fields && fields.options)).map((f, i) => (
      <tr key={i}>
        <td>
          <input
            type="checkbox"
            value={((nextFields && nextFields.options) || (fields && fields.options))[f].name}
            checked={((nextFields && nextFields.options) || (fields && fields.options))[f].enabled}
            onChange={e => this.onFieldClick(e)}
          />
        </td>
        <td>
          <div className="data-type">
            <div>
              {((nextFields && nextFields.options) || (fields && fields.options))[f].type}
            </div>
          </div>
        </td>
        <td>
          {
            typeof ((nextFields && nextFields.options) || (fields && fields.options))[f].label === 'string'
              ? (((nextFields && nextFields.options) || (fields && fields.options))[f].label
                || ((nextFields && nextFields.options) || (fields && fields.options))[f].name)
              : ((nextFields && nextFields.options) || (fields && fields.options))[f].label.English
          }
        </td>
      </tr>
    ));

    const buildFieldsStr = nextFields && Object.keys(nextFields.options).filter(f => nextFields.options[f].enabled).map(f => nextFields.options[f].name).join();
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
                    <span className={`${stepsState.selectDataStage || stepsState.finalizeStage ? 'success' : stepsState.selectSourceStage ? 'active' : ''}`}>
                      {(stepsState.selectDataStage || stepsState.finalizeStage) && <Glyphicon glyph="ok" />}
                    </span>
                  </a>
                </li>
                <li className="divider" />
                <li>
                  <a>
                    <span className={`${stepsState.finalizeStage ? 'success' : stepsState.selectDataStage ? 'active' : ''}`}>
                      {stepsState.finalizeStage && <Glyphicon glyph="ok" />}
                    </span>
                  </a>
                </li>
                <li className="divider" />
                <li>
                  <a>
                    <span className={`${stepsState.finalizeStage ? 'active' : ''}`} />
                  </a>
                </li>
              </ul>
            </div>
            <Row className="stage-description-row">
              <Col md={{ size: 4 }}>
                {`${stepsState.selectSourceStage ? 'Select Source' : ''}`}
              </Col>
              <Col md={{ size: 4 }}>
                {`${stepsState.selectDataStage ? 'Select Data' : ''}`}
              </Col>
              <Col md={{ size: 4 }}>
                {`${stepsState.finalizeStage ? 'Finalize' : ''}`}
              </Col>
            </Row>
            <hr />
            {stepsState.selectSourceStage
              ? (
                <div className="apps-section">
                  <div>
                    {appBuilder}
                  </div>
                </div>
              ) : stepsState.selectDataStage
                ? (
                  <Container fluid>
                    {this.props.global.formsError.length > 0
                    && (
                      <Row>
                        <div className="alert alert-danger" role="alert">
                          {this.props.global.formsError}
                        </div>
                      </Row>
                    )}
                    <Row>
                      <Col md="6">
                        <Label>Programs</Label>
                        <br />
                        <AsyncSelect
                          name="programs"
                          placeholder="Select Program"
                          value={this.state.selectedProgram || ''}
                          isClearable
                          cacheOptions
                          handleBlur={e => this.handleBlur(e)}
                          loadOptions={this.loadProgramOptions}
                          defaultOptions={this.getProjectOptions()}
                          onChange={e => this.handleProgramSelect(e)}
                        />
                      </Col>
                      <Col md="6">
                        <Label>Fields</Label>
                        <br />
                        <div className="fields-wrapper">
                          <Table borderless>
                            <thead>
                              <tr>
                                <th>
                                  <input
                                    type="checkbox"
                                    checked={nextFields && (nextFields.toggleAllOn || false)}
                                    onChange={e => this.toggleAllFields(e)}
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
                        <Label>Forms</Label>
                        <br />
                        <AsyncSelect
                          name="forms"
                          placeholder="Select Form"
                          value={this.state.selectedForm || ''}
                          defaultOptions={this.getFormOptions()}
                          isClearable
                          cacheOptions
                          onChange={e => this.handleFormSelect(e)}
                          handleBlur={e => this.handleBlur(e)}
                          loadOptions={this.loadFormOptions}
                        />
                      </Col>
                    </Row>
                  </Container>
                ) : stepsState.finalizeStage
                  ? (
                    <Container fluid>
                      <Row>
                        <Col sm="12" md={{ size: 10, offset: 2 }}>
                          <Table borderless className="selected-items">
                            <tbody>
                              <tr>
                                <td>
                                  <Label>Program</Label>
                                </td>
                                <td>
                                  <span>{(this.state.selectedProgram && this.state.selectedProgram.label) || 'No program selected'}</span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <Label>Form</Label>
                                </td>
                                <td>
                                  {(this.state.selectedForm && this.state.selectedForm.label) || 'No form selected'}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <Label>Fields</Label>
                                </td>
                                <td>
                                  <div className="fields-string" title={buildFieldsStr || 'No fields selected'}>{buildFieldsStr || 'No fields selected'}</div>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                      <Row>
                        <hr />
                      </Row>
                      <Row>
                        <Col sm="12" md={{ size: 10, offset: 2 }}>
                          <Table borderless className="selected-items">
                            <tbody>
                              <tr>
                                <td>
                                  <Label>Flow Name</Label>
                                </td>
                                <td>
                                  <input type="text" className="flow-name" onChange={e => this.handleFlowNameInput(e)} onKeyPress={e => this.handleKeyPress(e)} />
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </Container>
                  )
                  : ''}
          </Modal.Body>
          {stepsState.finalizeStage
            ? (
              <Modal.Footer>
                <Button disabled={stepsState.disabledPrevBtn} onClick={this.handlePreviousButton}>PREVIOUS</Button>
                <Button disabled={stepsState.disabledNextBtn} onClick={this.handleSaveFlow}>SAVE</Button>
                <Button disabled={stepsState.disabledNextBtn} onClick={this.handleNextButton} className="save-and-pull">SAVE & PULL</Button>
              </Modal.Footer>
            )
            : (
              <Modal.Footer>
                <Button disabled={stepsState.disabledPrevBtn} onClick={this.handlePreviousButton}>PREVIOUS</Button>
                <Button disabled={stepsState.disabledNextBtn} onClick={this.handleNextButton}>NEXT</Button>
              </Modal.Footer>
            )
          }
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(NewFlowPage);
