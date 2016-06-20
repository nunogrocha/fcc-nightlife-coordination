import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { HTTP } from 'meteor/http';
 
import { Events } from '../../../api/events.js';
 
class Index extends Component {
  constructor(props) {
    super(props);
 
    this.state = { };
  }

  getYelpEvents() {
    Meteor.call('events.getList', "lisbon", (error, result) => {
        if(error) {
          // handle error
        } else {
          console.log(result)
        }
      });
      /*
    HTTP.call("GET", "https://api.yelp.com/v2/search/?location=Lisbon",
      function (error, result) {
        if (!error) {
          console.log(result)
        }
      });
      */
  }

  render() {
    return (
      <div>
        <div className="container">  
          <div className="toptron">
            <h3>See which bars are hoppin' tonight and RSVP ahead of time!</h3>
            <form className="form-inline">
              <input className="form-control margin-right-xs" type="text" placeholder="Location"/>
              <div className="btn btn-success-outline margin-right-xs" onClick={this.getYelpEvents.bind(this)}>Search</div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  //events: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};
 
export default createContainer(() => {
  Meteor.subscribe('events');
  
  return {
    //events: Events.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, Index);