Template.element.events({
  'blur .element-input': function(e) {
    e.preventDefault();

    var elementId = $(e.target).data("id");
    var text = $(e.target).val();

    Elements.update(elementId, {$set: {text: text}});
  },

  'mouseenter .element-draggable': function(e) {
    $(e.target).css('border', 'dashed 1px rgba(0,0,0,0.4)');
  },
  'mouseleave .element-draggable': function(e) {
    $(e.target).css('border', 'dashed 1px transparent');
  },

  'mouseleave .element-resizable': function(e) {
    $("textarea").resizable({
    resize: function() {
      var elementId = $(e.target).data("id");
      var textHeight = $(".textbox").height();
      var textWidth = $(".textbox").width();
      Elements.update(elementId, {$set: {textBoxHeight: textHeight
        , textBoxWidth: textWidth}});
    }
    });
  },

  'focus .element-draggable': function() {
    $('.edit-element[data-id="'+ this._id +'"]').css('visibility', 'visible');
  },
  'blur .element-draggable': function() {

    $('.edit-element[data-id="'+ this._id +'"]').css('visibility', 'hidden');
  },
});

Template.element.helpers({
  adjustedTop: function(){
    return this.top - 40;
  }
})

Template.element.rendered = function () {
  $( ".draggable" ).draggable({
    stop: function(event, ui) {
      var elementId = $(event.target).data("id");
      var top = $(event.target).position().top;
      var left = $(event.target).position().left;

      var data = {
        top: top,
        left: left
      };

      Meteor.call("updateElement", elementId, data);
    }
  });

};
