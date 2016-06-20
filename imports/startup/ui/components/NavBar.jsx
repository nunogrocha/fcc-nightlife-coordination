import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class NavBar extends Component {
  
  render() {
   
    return (
      <nav className="navbar navbar-light bg-faded">
        <div className="container">
          <a className="navbar-brand" href="/">NightLife Coordination</a>
          <div className="form-inline pull-xs-right"> 
            <AccountsUIWrapper />
          </div>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  currentUser: PropTypes.object,
};