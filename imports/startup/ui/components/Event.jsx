import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Events } from '../../../api/events.js';

class Event extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      going: 0,
    };
  }
  
  refreshGoing() {
    Meteor.call('myEvents.getGoing', this.props.event.id, (error, result) => {
      if(error) {
        console.log(error)
      } else {
        if (typeof result !== 'undefined') {
          if (result.length > 0) {
            if (typeof result !== 'undefined') {
              this.setState({ going: result[0].going });
            }
          }
        }
      }
    });
  }
  
  componentWillMount() {
    this.refreshGoing();
  }
  
  signEvent() {
    if (!Meteor.user()) {
      alert("Must sign in!")
    } else {
      Meteor.call('myEvents.setGoing', this.props.event.id, Meteor.user()._id, (error, result) => {
        if(error) {
          console.log(error)
        } else {
          this.refreshGoing();
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
              { this.state.going } Going
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

export default createContainer(() => {
  Meteor.subscribe('myEvents');
  
  return {
    //going: Events.find({}).fetch(),
  };
}, Event);