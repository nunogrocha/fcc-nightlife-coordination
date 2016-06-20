import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Events = new Mongo.Collection('events');
 
if (Meteor.isServer) {
 

}

Meteor.methods({
  'events.getList'(location) {
    check(location, String);
    HTTP.call("GET", "https://api.yelp.com/v2/search/?location=Lisbon",
      function (error, result) {
        if (!error) {
          return result;
        }
      });
  }
});
