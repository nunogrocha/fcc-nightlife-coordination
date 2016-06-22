import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import EventList from '../components/EventList.jsx';

function callMeteorMethod(methodName, ...args) {
    return new Promise((resolve, reject) => {
        Meteor.call(methodName, ...args, (error, result) => {
            if (error) reject(error)
            else resolve(result)
        })
    })
}
 
class Index extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      events: [],
      loading: false,
    };
  }

  async getYelpEvents() {
    this.setState({loading: true});
    searchText = ReactDOM.findDOMNode(this.refs.searchText).value.trim();
    let result = await callMeteorMethod('events.getList', searchText)
    this.setState({loading: false});
    this.setState({events: result.businesses});
  }

  render() {
    return (
      <div>
        <div className="container">  
          <div className="toptron">
            <h3>See which bars are hoppin' tonight and RSVP ahead of time!</h3>
            <form className="form-inline">
              <input className="form-control margin-right-xs" type="text" ref="searchText" placeholder="Location"/>
              <div className="btn btn-success-outline margin-right-xs" onClick={this.getYelpEvents.bind(this)}>Search</div>
            </form>
          </div>
          {
            this.state.loading ? 
              <div className="text-center">Loading ...</div> : 
              <div></div>
          }
          <div className="list-group">
            <EventList events={this.state.events} user={this.props.currentUser}/>
          </div>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  currentUser: PropTypes.object,
};
 
export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, Index);