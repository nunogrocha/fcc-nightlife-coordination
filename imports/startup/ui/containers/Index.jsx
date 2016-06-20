import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Events } from '../../../api/events.js';
 import Yelp from 'yelp';
var yelp = new Yelp({
  consumer_key: 'W0zcQL8j9GwUHwgWKUiR5w',
  consumer_secret: 'n29WXNpzbHEsffNO9rJOVE0kvzw',
  token: 'uVJX7CkMx-Tl8-v4EUiE1PqnBxH6J0rn',
  token_secret: 'W1t3Wew2R1_Wr9p2XGWGVizlS14',
});
class Index extends Component {
  constructor(props) {
    super(props);
 
    this.state = { };
  }

  getYelpEvents() {
    yelp.search({ location: location })
    .then(function (data) {
      console.log(data)
      return data;
    })
    .catch(function (err) {
      console.error(err);
    });
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