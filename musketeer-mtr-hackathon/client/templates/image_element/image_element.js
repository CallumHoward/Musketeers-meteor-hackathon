Template.imageElement.events({
  'blur .element-input': function(e) {
    e.preventDefault();

    var elementId = $(e.target).data("id");
    var text = $(e.target).val();

    Elements.update(elementId, {$set: {text: text}});
  },

  'click .delete-element': function(e) {
    e.preventDefault();
    console.log("delete");
    var elementId = $(e.target).data("id");
    console.log(elementId);
    Elements.remove(elementId);
  },

  'mouseenter .element-item': function(e) {
    $(e.target).css('border', 'dashed 1px rgba(0,0,0,0.4)');
  },
  'mouseleave .element-item': function(e) {
    $(e.target).css('border', 'dashed 1px transparent');
  },


  'click .element-draggable': function() {
    $('.edit-element[data-id="'+ this._id +'"]').css('visibility', 'visible');
  },
  'mouseleave .element-draggable': function() {
    $('.edit-element[data-id="'+ this._id +'"]').css('visibility', 'hidden');
  },
});

Template.imageElement.rendered = function () {
  $( ".draggable" ).draggable({
    stop: function(event, ui) {
      var elementId = $(event.target).data("id");
      var top = ui.position.top;
      var left = ui.position.left;

      var data = {
        top: top,
        left: left
      };

      Meteor.call("updateElement", elementId, data);
    }
  });

  $(".resizable").resizable({
    stop: function(e, ui) {
      var elementId = $(e.target).data("id");
      var height = ui.size.height;
      var width = ui.size.width;
      console.log(height +', '+ width);
      Elements.update(elementId, {
        $set: {
          height: height,
          width: width
        }
      });
    }
  });
};
