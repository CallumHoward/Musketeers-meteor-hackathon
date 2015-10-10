Template.canvasNew.events({
  'click #submit-button': function(e) {
    e.preventDefault();

    var canvasWidth = 854;
    var canvasOffset = canvasWidth / 2;
    var contentWidth = 500;
    var centerOffset = contentWidth / 2;

    Elements.insert({
      type: 'text',
      text: 'Title',
      align: 'center',
      top: 50,
      left: canvasOffset - centerOffset,
      textBoxWidth: contentWidth
    });

    Elements.insert({
      type: 'text',
      text: 'main content',
      align: 'left',
      top: 150,
      left: canvasOffset - centerOffset,
      textBoxWidth: contentWidth,
      textBoxHeight: 200
    });
  },

  'click #save-button': function(e) {
    e.preventDefault();
    var canvasName = "test canvas 1";
    var elements = [];
    var allElements = Elements.find().fetch();
    for (var element in allElements) {
        elements.push(element._id);
        console.log("an element");
    }
    Canvases.upsert(canvasName, {$set: {elements: elements}});
  }
});
