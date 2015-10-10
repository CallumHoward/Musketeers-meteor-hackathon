Template.element.events({
  'submit .element-input': function(e){
    e.preventDefault();

    var elementId = $(e.target).data("id");
    var text = $(e.target).find('[name=text]').val();
    Elements.update(elementId, {$set: {text: text, editVisible: "visible"}});
  },

  'change .edit-family': function(e){
    e.preventDefault();
    var elementId = $(e.target).data("id");
    var currFontFamily = $('#font-family').val();
    Elements.update(elementId, {$set: {fontFamily: currFontFamily}});
  },

  'change .edit-size': function(e) {
    e.preventDefault();
    var elementId = $(e.target).data("id");
    var currFontSize = $('#font-size').val();
    Elements.update(elementId, {$set: {fontSize: currFontSize}});
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

var fontFamiliesItems = ['Comic Sans Ms', 'Verdana',
'Georgia', 'Times New Roman'];

var fontSizeItems = [12, 14, 16, 18, 21, 24, 28, 32, 36, 42, 48, 56, 64, 72, 80,
88, 96, 104, 120, 144];

Template.element.helpers({
  fontFamilies: fontFamiliesItems,
  fontSizes: fontSizeItems
});
