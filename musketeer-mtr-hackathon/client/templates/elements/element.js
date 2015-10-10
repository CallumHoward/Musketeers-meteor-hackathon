Template.element.helpers({
  'editElementTop': function() {
    return this.top - 40;
  },
  'editElementLeft': function() {
    return this.left + 16;
  }
});

Template.element.events({
  'submit .element-input': function(e){
    e.preventDefault();

    var elementId = $(e.target).data("id");
    var text = $(e.target).find('[name=text]').val();
    Elements.update(elementId, {$set: {text: text, editVisible: "visible"}});
  },

  'mouseenter .element-item': function(e) {
    $(e.target).css('border', 'dashed 1px rgba(0,0,0,0.4)');
  },

  'mouseleave .element-item': function(e) {
    $(e.target).css('border', 'dashed 1px transparent');
  },

  'change .edit-family': function(e){
    e.preventDefault();
    var elementId = $(e.target).data("id");
    var currFontFamily = $('#font-family').val();
    Elements.update(elementId, {$set: {fontFamily: currFontFamily}});
  },

  'focus .element-draggable': function() {
    $('.edit-element[data-id="'+ this._id +'"]').css('visibility', 'visible');
  },

  'blur .element-draggable': function() {
    $('.edit-element[data-id="'+ this._id +'"]').css('visibility', 'hidden');
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

Template.editFontSize.helpers({
  fontSizes: fontSizeItems
});

Template.editFontFamily.helpers({
  fontFamilies: fontFamiliesItems
});
