Template.element.events({
  'submit .element-input': function(e){
    e.preventDefault();

    var elementId = $(e.target).data("id");
    var text = $(e.target).find('[name=text]').val();
    Elements.update(elementId, {$set: {text: text, editVisible: "visible"}});
  },

  'submit .edit-element': function(e){
    e.preventDefault();
    var elementId = $(e.target).data("id");
    var text = $(e.target).find('[name=text]').val();
    Elements.update(elementId, {$set: {text: text, editVisible: "visible"}});
  },

  'focus .element-item': function(e) {
    $('.edit-element[data-id="'+ this._id +'"]').toggle();
  },

  'blur .element-item': function(e) {
    $('.edit-element[data-id="'+ this._id +'"]').toggle();
  }
});

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
