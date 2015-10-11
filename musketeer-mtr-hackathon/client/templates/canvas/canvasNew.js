Template.canvasNew.events({
  'click #submit-button': function(e) {
    e.preventDefault();

    var canvasWidth = 854;
    var canvasOffset = canvasWidth / 2;
    var contentWidth = 500;
    var centerOffset = contentWidth / 2;

    var currentCanvasElements = [];
    currentCanvasElements.push(
        Elements.insert({
            type: 'text',
            text: 'Title',
            align: 'center',
            top: 50,
            left: canvasOffset - centerOffset,
            textBoxWidth: contentWidth
        })
    );

    currentCanvasElements.push(
        Elements.insert({
            type: 'text',
            text: 'main content',
            align: 'left',
            top: 150,
            left: canvasOffset - centerOffset,
            textBoxWidth: contentWidth,
            textBoxHeight: 200
        })
    );

    Session.set("currentCanvas", _.map(
        Elements.find({_id: {$in: currentCanvasElements}}).fetch(), function(element){
            return element._id;
        }
    ));
  },

  'click #submit-button-img': function(e) {
    e.preventDefault();

    var currentCanvasElements = [];
    currentCanvasElements.push(
        Elements.insert({
            type: 'image',
            top: 50,
            left: 50,
            width: 100,
            height: 100,
            src: 'https://d117r1wt3t6ahr.cloudfront.net/MABK1bb8RLs/1/thumbnail.png'
        })
    );

    Session.set("currentCanvas", _.map(
        Elements.find({_id: {$in: currentCanvasElements}}).fetch(), function(element){
            return element._id;
        }
    ));
  },

  'click #save-button': function(e) {
    e.preventDefault();
    var canvasName = $("#canvas-name-input").val();
    // extract element ids from session
    var elements = _.map(Session.get("currentCanvas"), function(element){ return element._id; });
    var thumbnail = $("#thumbnail").val();
    console.log(thumbnail);
    var currentCanvasId = Canvases.insert({name: canvasName, elements: elements, thumbnail: thumbnail});
    Session.set("currentCanvasId", currentCanvasId);
  },

  'click #load-button': function(e) {
    e.preventDefault();
    var canvasId = $("#load-button-select").val();
    console.log(canvasId);
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

    getCurrentCanvasName: function() {
        var canvasId = Session.get("currentCanvasId");
        if (canvasId) {
            return Canvases.findOne(canvasId).name;
        } else {
            return "untitled_canvas";
        }
    },
    isText: function() {
      return this.type === 'text';
    },
    isImage: function() {
      return this.type === 'image';
    }
});
