Template.homepage.rendered = function () {
  $( ".draggable" ).draggable();
};

Template.homepage.events({
    "click .canvas-selector": function (e) {
        var canvasId = $(e.target).data("id");
        var elementIds = Canvases.findOne(canvasId).elements;
        Session.set("currentCanvas", elementIds);
        console.log("clicked");
    }
});

Template.homepage.helpers({
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

