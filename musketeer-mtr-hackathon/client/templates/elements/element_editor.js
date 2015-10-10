var fontFamilyItems = ['Open Sans', 'Noto Sans', 'Lato'];
var fontSizeItems = [12, 14, 16, 18, 21, 24, 28, 32, 36, 42, 48, 56, 64, 72, 80, 88, 96, 104, 120, 144];
var fontColorItems = ['black', 'white', 'red', 'blue', 'green', 'grey', 'cyan', 'yellow'];
var fontStyleItems = ['bold', 'italic'];
var textAlignItems = ['left', 'center', 'right'];

Template.elementEditor.helpers({
  fontSizes: function() {
    return fontSizeItems;
  },
  fontFamilies: function() {
    return fontFamilyItems;
  },
  fontColors: function() {
    return fontColorItems;
  },
  fontStyles: function() {
    return fontStyleItems;
  },
  textAligns: function() {
    return textAlignItems;
  }
});

Template.elementEditor.events({
  'change': function(e) {
    var elementId = $(e.target).data("id");
    var property = $(e.target).attr('name');
    var value = $(e.target).context.value;
    console.log(elementId + ':' + property + ' -> ' + value);

    var propToSet = {};
    propToSet[property] = value;

    Elements.update(elementId, {$set: propToSet});
  }
});
