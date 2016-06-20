import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Events } from '../../../api/events.js';

export default class EventList extends Component {

  render() {
    console.log(this.props.events)
    return (
      <div href="#" class="list-group-item active">
        <h4 class="list-group-item-heading">List group item heading</h4>
        <p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
      </div>
    );
  }
}
 
EventList.propTypes = {
  events: PropTypes.object.isRequired,
};