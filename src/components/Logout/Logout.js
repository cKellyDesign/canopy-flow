import React, { Component } from 'react';
import { 
  // Grid,
  // Row,
  // Col,
  // FormGroup,
  // ControlLabel,
  // FormControl,
  Button,
  // HelpBlock,
} from 'react-bootstrap';

class Logout extends Component {
  render() {
    const { onLogoutClick } = this.props;
    return (
      <div>
        <Button
          bsStyle="primary"
          bsSize="lg"
          onClick={() => onLogoutClick()}
          >Sign Out</Button>
      </div>
    );
  }
}

export default Logout;
