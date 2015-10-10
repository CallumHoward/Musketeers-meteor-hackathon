Template.element.events({
  'submit .element-input': function(e){
    e.preventDefault();

    var elementId = $(e.target).data("id");
    var text = $(e.target).find('[name=text]').val();


    Elements.update(elementId, {$set: {text: text, editVisible: "visible"}})

  }
});
