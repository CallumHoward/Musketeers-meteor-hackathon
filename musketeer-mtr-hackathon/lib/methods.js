Meteor.methods({
  'updateElement': function(elementId, data) {
    Elements.update(elementId, {$set: data});
  }
});
