import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Actions from '../../store/actions';
import { mapStateToProps } from './../../helpers/mapStateToProps';
import './SideMenu.css';

class SideMenu extends Component {
  handleFlowClick(e) {
    const { dispatch } = this.props;
    const flowName = e.currentTarget.getAttribute('data-key');
    const status = e.currentTarget.getAttribute('data-downloadable');
    dispatch(Actions.selectedFlow({
      flowName,
      status,
    }));
  }
  render() {
    const { forms } = this.props.global;
    return (
      <div className="sidebar-wrapper">
        <div className="flow-details">
          <div className="new-flow-section">
            <Button onClick={this.props.toggle} outline color="secondary" size="lg" className="new-flow">New Flow</Button>{' '}
          </div>
          <div className="flow-header">
            <h4>
              {`Flows `}
              <Badge>{`${(!this.props.global || !this.props.global.forms) ? '0' : this.props.global.forms.length}`}</Badge>
            </h4>
          </div>
        </div>
        <div className="flow-detail-wrapper">
          <ul className="sidebar-nav">
          {this.props.global && this.props.global.forms ?
            forms.map((f, i) => (
              <li key={i} data-key={f.title} data-downloadable={f.downloadable} className={`sidebar-brand ${f.title === this.props.global.flow.flowName ? 'active' : ''}`} onClick={(e) => this.handleFlowClick(e)}>
                <Link to="">{f.title}</Link>
                <span className={`flow-status ${f.downloadable ? 'active' : 'inactive'}`}/>
              </li>
            ))
          : <img alt="loading..." src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SideMenu);
