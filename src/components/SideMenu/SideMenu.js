import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { mapStateToProps } from './../../helpers/mapStateToProps';
import './SideMenu.css';

class SideMenu extends Component {
  render() {
    return (
      <div className="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li className="sidebar-brand">
          <Button outline color="secondary" size="lg" className="new-flow">New Flow</Button>{' '}
          </li>
          <li className="sidebar-brand">
            <a href="#" className="">Test flows</a>
          </li>
          <li className="sidebar-brand">
            <a href="#" className="">Test flows</a>
          </li>
          <li className="sidebar-brand">
            <a href="#" className="">Test flows</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SideMenu);
