import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NewFlowPage.css';

const APPS = [
  "ONA",
  "OpenSRP",
  "Kobo",
  "CommCare",
  "Excel"
]; // Move this to config file/constants file/default state

class NewFlowPage extends Component {
  render() {
    const appBuilder = APPS.map(a => (
      <Link key={a} to="" className="app-link">
        <span className="app-icon">
          <img alt="Loading..." src="img/rapidpro_ona.png" />
          <span>{a}</span>
        </span>
      </Link>
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
                  <span></span>
                </a>
              </li>
              <li className="divider"></li>
              <li>
                <a>
                  <span></span>
                </a>
              </li>
              <li className="divider"></li>
              <li>
                <a>
                  <span></span>
                </a>
              </li>
             </ul>
           </div>
           <hr />
           <div className="apps-section">
             <div>
             {appBuilder}
             </div>
           </div>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled onClick={this.props.toggle}>PREVIOUS</Button>
            <Button onClick={this.props.toggle}>NEXT</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default NewFlowPage;
