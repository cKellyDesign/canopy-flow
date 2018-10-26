import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Actions from '../../store/actions';
import { mapStateToProps } from '../../helpers/mapStateToProps';
import './SideMenu.css';

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flowName: (this.props.global.flow && this.props.global.flow.flowName) || null,
      flow: this.props.global.flow,
      flows: this.props.global.flows,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.global) {
      this.setState({
        flowName: nextProps.global.flow && nextProps.global.flow.flowName,
        flow: nextProps.global.flow,
        flows: nextProps.global.flows,
      });
    }
  }

  handleFlowClick(e) {
    const { dispatch } = this.props;
    const flowName = e.currentTarget.getAttribute('data-key');
    dispatch(Actions.selectedFlow({
      flowName,
      status: true,
    }));
  }

  render() {
    const { flows } = this.state;
    return (
      <div className="sidebar-wrapper">
        <div className="flow-details">
          <div className="new-flow-section">
            <Button onClick={this.props.toggle} outline color="secondary" size="lg" className="new-flow">New Flow</Button>
            {' '}
          </div>
          <div className="flow-header">
            <h4>
              {'Flows '}
              <Badge>{`${(!this.props.global || JSON.stringify(this.props.global.flows) === '{}') ? '0' : Object.keys(flows).length}`}</Badge>
            </h4>
          </div>
        </div>
        <div className="flow-detail-wrapper">
          <ul className="sidebar-nav">
            {this.props.global && JSON.stringify(this.props.global.flows) !== '{}'
              ? Object.keys(flows).map((f, i) => (
                <li key={i} data-key={flows[f].form} className={`sidebar-brand ${flows[f].form === (this.state && this.state.flowName) ? 'active' : ''}`} onClick={e => this.handleFlowClick(e)}>
                  <Link to="">{flows[f].form}</Link>
                  <span className={`flow-status ${flows[f].status ? 'active' : 'inactive'}`} />
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
