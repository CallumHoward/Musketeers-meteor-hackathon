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

    Session.set("currentCanvas", _.map(Elements.find().fetch(), function(element){
        return element._id;
    }));
  },

  'click #save-button': function(e) {
    e.preventDefault();
    var canvasName = $("#canvas-name-input").val();
    // extract element ids from session
    var elements = _.map(Session.get("currentCanvas"), function(element){ return element._id; });
    Canvases.insert({name: canvasName, elements: elements});
  },

  'click #load-button': function(e) {
    e.preventDefault();
    var canvasId = $("#load-button-select").val();
    var elementIds = Canvases.findOne(canvasId).elements;
    Session.set("currentCanvas", elementIds);
  }
});

Template.canvasNew.helpers({
    // given canvas id, returns all elements in canvas
    currentCanvasHelper: function() {
        var elementIds = Session.get("currentCanvas");
        return _.map(elementIds, function(elementId){
            return Elements.findOne(elementId);
        });
    },
});
