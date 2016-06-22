import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Events } from '../../../api/events.js';

function callMeteorMethod(methodName, ...args) {
    return new Promise((resolve, reject) => {
        Meteor.call(methodName, ...args, (error, result) => {
            if (error) reject(error)
            else resolve(result)
        })
    })
}

export default class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      going: 0,
      mounted: false,
      prevProps: null,
      eventId: null,
      user: null,
    };
  }

  componentDidMount() {
    this.setState({ prevProps: this.props.event, user: this.props.user });
    if (!this.state.mounted) {
      this.setState({ mounted: true });
      this.refreshGoing(this.props.event.id);
    }
  }
  
  componentDidUpdate() {
    if (this.state.prevProps != this.props.event || this.state.user != this.props.user) {
      this.setState({prevProps: this.props.event, user: this.props.user });
      this.refreshGoing(this.props.event.id);
    }
  }

  async refreshGoing(evId) {
    if (Meteor.user()) {
      let result = await callMeteorMethod('getGoing', evId, Meteor.user()._id)
      if (result.length > 0) {
        this.setState({going: result[0].going, eventId: evId});
      } else {
        this.setState({going: 0, eventId: evId});
      }
    } else {
      this.setState({going: 0, eventId: evId});
    }
  }
  
  signEvent() {
    if (!Meteor.user()) {
      alert("Must sign in!")
    } else {
      Meteor.call('myEvents.setGoing', this.state.eventId, Meteor.user()._id, (error, result) => {
        if(error) {
          console.log(error)
        } else {
          console.log(Meteor.user()._id)
          this.refreshGoing(this.state.eventId)
        }
      });
    }
  }

  render() {
    return (
      <div href="#" className="list-group-item ">
      {
        this.props.event.image_url ? 
        <img src={this.props.event.image_url} alt="..." className="img-circle"/> :
        <img src="http://megaicons.net/static/img/icons_sizes/8/178/512/catering-bar-icon.png" width="100" alt="..." className="img-circle"/>
      }
        <div className="item-list-text">
          <h4 className="list-group-item-heading">{this.props.event.name} 
            <button onClick={this.signEvent.bind(this)} type="button" className="btn btn-primary-outline btn-header">
              { this.state.going > 0 ? "You're going!" : "Go" }
            </button>
          </h4>
          <p className="list-group-item-text">{this.props.event.snippet_text}</p>
        </div>
      </div>
    );
  }
}
 
Event.propTypes = {
  event: PropTypes.object.isRequired,
};