import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Events } from '../../../api/events.js';
import Event from './Event.jsx';

export default class EventList extends Component {

  renderEvents() {
    let events = this.props.events;
    return events.map((event, key) => {
      return (
        <Event
          key={key}
          event={event}
        />
      );
    });
  }

  render() {
    console.log(this.props.events)
    return (
      <div href="#" class="list-group-item active">
        {this.renderEvents()}
      </div>
    );
  }
}
 
EventList.propTypes = {
  events: PropTypes.object.isRequired,
};