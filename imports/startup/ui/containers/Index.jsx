import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Events } from '../../api/events.js';
 
class Index extends Component {
  constructor(props) {
    super(props);
 
    this.state = { };
  }

  render() {
    return (
      <div>
        <div className="container">  

        </div>
      </div>
    );
  }
}

Index.propTypes = {
  events: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};
 
export default createContainer(() => {
  Meteor.subscribe('events');
  
  return {
    events: Events.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, Index);