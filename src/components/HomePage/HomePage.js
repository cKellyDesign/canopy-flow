import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Grid,
  Row,
} from 'react-bootstrap';
import { Col } from 'reactstrap';
import Header from './../Header/Header';
import SideMenu from './../SideMenu/SideMenu';
import NewFlowPage from '../NewFlowPage/NewFlowPage';
import { mapStateToProps } from '../../helpers/mapStateToProps';
import Actions from '../../store/actions';
import './HomePage.css';

const EVENTS = [
  { date: "July 23rd, 2018", 'event-type':"Event Type A", username: "Username x" },
  { date: "July 23rd, 2019", 'event-type':"Event Type B", username: "Username x" },
  { date: "July 23rd, 2020", 'event-type':"Event Type C", username: "Username x" },
  { date: "July 23rd, 2021", 'event-type':"Event Type D", username: "Username x" },
  { date: "July 23rd, 2022", 'event-type':"Event Type E", username: "Username x" },
  { date: "July 23rd, 2023", 'event-type':"Event Type F", username: "Username x" },
  { date: "July 23rd, 2024", 'event-type':"Event Type G", username: "Username x" },
  { date: "July 23rd, 2025", 'event-type':"Event Type H", username: "Username x" },
  { date: "July 23rd, 2025", 'event-type':"Event Type H", username: "Username x" },
  { date: "July 23rd, 2025", 'event-type':"Event Type H", username: "Username x" },
  { date: "July 23rd, 2025", 'event-type':"Event Type H", username: "Username x" },
  { date: "July 23rd, 2025", 'event-type':"Event Type H", username: "Username x" },
  { date: "July 23rd, 2025", 'event-type':"Event Type H", username: "Username x" },
  { date: "July 23rd, 2025", 'event-type':"Event Type H", username: "Username x" },
  { date: "July 23rd, 2025", 'event-type':"Event Type H", username: "Username x" },
  { date: "July 23rd, 2025", 'event-type':"Event Type H", username: "Username x" },
  { date: "July 23rd, 2025", 'event-type':"Event Type H", username: "Username x" },
];
class HomePage extends Component {
  static groupedArray(arr, chunkSize) {
    const groups = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      currentPage: 'first',
      activeGroupIndex: 0,
      eventsPerPage: 5,
      itemsToShow: [],
      groupedEvents: HomePage.groupedArray(EVENTS, 5),
    };
    this.toggle = this.toggle.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.renderEventRows = this.renderEventRows.bind(this);
  }

  toggle() {
    const { dispatch } = this.props;
    dispatch(Actions.fetchFormsError(''));

    this.setState({
      modal: !this.state.modal,
    });
  }

  renderEventRows() {
    const { groupedEvents, activeGroupIndex } = this.state;
    return groupedEvents[activeGroupIndex].map((e, i) => (
      <tr key={i}>
        <td>{e.date}</td>
        <td>{e['event-type']}</td>
        <td>{e.username}</td>
      </tr>
    ));
  }

  handlePagination(e) {
    const { groupedEvents, activeGroupIndex } = this.state;
    const id = e.target.id;
    this.setState({
      currentPage: id,
      activeGroupIndex: id === 'first' ? 0 : id === 'next' ? activeGroupIndex + 1 : id === 'previous' ? activeGroupIndex - 1 : id === 'last' ? groupedEvents.length - 1 : 0
    });
  }

  async componentWillMount() {
    const { dispatch } = this.props;
    const token = this.props.global.access_token;
    try {
      await dispatch(Actions.getProjects(token));
      await dispatch(Actions.getUserForms(token));
    } catch(e) {
      return false
    }
  }
  render() {
    const { activeGroupIndex, groupedEvents } = this.state;
    return (
      <div>
        <Header />
        <div id="HomePage" className="homepage">
          <SideMenu toggle={this.toggle} />
          <Grid fluid>
            <Row className="main">
              <NewFlowPage toggle={this.toggle} isOpen={this.state.modal}/>
            </Row>
            <Row>
              <Col md="3" sm="4">
                <h4>
                  Flow 3
                </h4>
                <p>Last update 9:11am, 29th Jul</p>
                <p>Live status: On</p>
              </Col>
              <Col md="9" className="activity-toolbars" style={{ textAlign: 'right' }}>
                <h4>
                  <span className="glyphicon glyphicon-refresh" />
                  <span className="glyphicon glyphicon-cog" />
                </h4>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <div className="activity-panel">
                  <div className="panel-heading">
                    <h3>Activity</h3>
                  </div>
                  <div className="panel-body">
                    <div className="flow-activity-stats clearfix">
                        <div className="stats-box">
                          <h3>90</h3>
                          <span>Events</span>
                        </div>
                        <div className="stats-box">
                          <h3>90</h3>
                          <span>Last Event</span>
                        </div>
                        <div className="stats-box">
                          <h3>90</h3>
                          <span>Activated Users</span>
                        </div>  
                    </div>
                    <div className="events-graph">
                      <div>
                        <h4><span>Events</span></h4>
                      </div>
                    </div>
                    <div className="events-table-container">
                      <table className="events-table">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Event Type</th>
                            <th>Username</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.renderEventRows()}
                        </tbody>
                      </table>
                      <div className="pagination">
                        <p>{`Page ${activeGroupIndex + 1} / ${groupedEvents.length}`}</p>
                        <div className="pagination-buttons">
                          <button disabled={activeGroupIndex === 0} onClick={(e) => this.handlePagination(e)} id="first">{'|<<'}</button>
                          <button disabled={activeGroupIndex === 0} onClick={(e) => this.handlePagination(e)} id="previous">{'<<'}</button>
                          <button disabled={activeGroupIndex === groupedEvents.length - 1} onClick={(e) => this.handlePagination(e)} id="next">{'>>'}</button>
                          <button disabled={activeGroupIndex === groupedEvents.length - 1} onClick={(e) => this.handlePagination(e)} id="last">{'|>>'}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomePage);
