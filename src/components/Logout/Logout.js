import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Logout extends Component {
  render() {
    const { onLogoutClick } = this.props;
    return (
      <div>
        <Button
          bsSize="sm"
          onClick={() => onLogoutClick()}
          >Sign Out</Button>
      </div>
    );
  }
}

export default Logout;
