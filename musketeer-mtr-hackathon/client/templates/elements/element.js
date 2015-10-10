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

  'change .edit-family': function(e){
    e.preventDefault();
    var elementId = $(e.target).data("id");
    var currFontFamily = $('#font-family').val();
    Elements.update(elementId, {$set: {fontFamily: currFontFamily}});
  },

  'focus .element-draggable': function() {
    $('.edit-element[data-id="'+ this._id +'"]').show();
  },

  'blur .element-draggable': function() {
    $('.edit-element[data-id="'+ this._id +'"]').hide();
  },

  'change .edit-size': function(e) {
    e.preventDefault();
    var elementId = $(e.target).data("id");
    var currFontSize = $('#font-size').val();
    Elements.update(elementId, {$set: {fontSize: currFontSize}});
  },

  'change .edit-color': function(e) {
    e.preventDefault();
    var elementId = $(e.target).data("id");
    var currFontColor = $('#font-color').val();
    Elements.update(elementId, {$set: {fontColor: currFontColor}});
  },

  'change .edit-style': function(e) {
    e.preventDefault();
    var elementId = $(e.target).data("id");
    var currFontStyle = $('#font-style').val();
    fontStyle = {};
    if (currFontStyle === 'italic') {
      fontStyle['fontStyle'] = currFontStyle;
      fontStyle['fontWeight'] = '';
    }
    else {
      fontStyle['fontWeight'] = currFontStyle;
      fontStyle['fontStyle'] = '';
    }
    Elements.update(elementId, {$set: fontStyle});
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

var fontColorItems = ['black', 'white', 'red', 'blue',
'green', 'grey', 'cyan', 'yellow'];

var fontStyleItems = ['bold', 'italic'];

Template.editFontSize.helpers({
  fontSizes: fontSizeItems
});

Template.editFontFamily.helpers({
  fontFamilies: fontFamiliesItems
});

Template.editFontColor.helpers({
  fontColors: fontColorItems
});

Template.editFontStyle.helpers({
  fontStyles: fontStyleItems
});
