Template.canvasNew.events({
  'click #submit-button': function(e) {
    e.preventDefault();

    Elements.insert({
      type: 'text',
      text: 'hello world',
      top: 50,
      left: 100
    });
  }
});
