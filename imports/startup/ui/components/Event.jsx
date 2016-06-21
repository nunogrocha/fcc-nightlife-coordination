import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Events } from '../../../api/events.js';

export default class Event extends Component {

  getPeople(eventId) {
    var people = Meteor.subscribe('event', eventId);
    if(people.ready()) {
      //data.post = Events.findOne({_id: postId});
      console.log(people)
    }
  }

  signEvent() {
    if (!Meteor.user()) {
      alert("Must sign in!")
    } else {
    Meteor.call('events.getAll', (error, result) => {
      //Meteor.call('events.setGoing', this.props.event.id, (error, result) => {
        if(error) {
          // handle error
        } else {
          console.log(result)
        }
      });
    }
  }

  render() {
    console.log(this.props.event)
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
              {
                this.props.people ? this.props.people : 0
              } Going
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
 
