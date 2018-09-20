import React, { Component } from 'react';
import { connect } from 'react-redux';

import { mapStateToProps } from './../../helpers/mapStateToProps';
import './SideMenu.css';

class SideMenu extends Component {
  render() {
    return (
      <div className="sidebar-wrapper">
      </div>
    );
  }
}

export default connect(mapStateToProps)(SideMenu);
