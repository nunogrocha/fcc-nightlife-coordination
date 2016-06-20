import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

 
export const Events = new Mongo.Collection('events');
 
if (Meteor.isServer) {
 



Meteor.methods({
  
});
}