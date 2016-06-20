import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import Yelp from 'yelp';
 
var yelp = new Yelp({
  consumer_key: 'W0zcQL8j9GwUHwgWKUiR5w',
  consumer_secret: 'n29WXNpzbHEsffNO9rJOVE0kvzw',
  token: 'uVJX7CkMx-Tl8-v4EUiE1PqnBxH6J0rn',
  token_secret: 'W1t3Wew2R1_Wr9p2XGWGVizlS14',
});
 
export const Events = new Mongo.Collection('events');
 
if (Meteor.isServer) {
 
Meteor.methods({
  'events.getList': async function(location) {
    check(location, String);
    
    if(!location) {
      location = "";
    }
    
    let resolve, reject
    const promise = new Promise((a, b) => { resolve = a; reject = b })
    
    yelp.search({ location: location })
    .then(function (data) {
      resolve(data)
    })
    .catch(function (err) {
      console.error(err);
    });
    
    return promise;
  }
});
}