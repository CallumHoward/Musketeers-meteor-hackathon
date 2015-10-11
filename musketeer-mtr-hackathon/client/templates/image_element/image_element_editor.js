var backgroundRepeatItems = ['repeat', 'repeat-x', 'repeat-y', 'no-repeat'];

Template.imageElementEditor.helpers({
  backgroundRepeats: backgroundRepeatItems,
});

Template.imageElementEditor.events({
  'change': function(e) {
    var elementId = $(e.target).data("id");
    var property = $(e.target).attr('name');
    var value = $(e.target).context.value;
    console.log(elementId + ':' + property + ' -> ' + value);

    var propToSet = {};
    propToSet[property] = value;

    Elements.update(elementId, {$set: propToSet});
  },
  'blur input[type=text]':function(e) {
    var elementId = $(e.target).data("id");
    var property = $(e.target).attr('name');
    var value = $(e.target).context.value;
    console.log(elementId + ':' + property + ' -> ' + value);

    var propToSet = {};
    propToSet[property] = value;

    Elements.update(elementId, {$set: propToSet});
  }
});
