Router.configure({
  layoutTemplate: 'layout'
});


Router.route('/', {
  name: 'homepage',
  data: function(){
    return{
      elements: Elements.find()
    };
  }
});


Router.route('/canvasNew', {
  name: 'canvasNew',
  data: function(){
    return{
      canvas: Canvas.find()
    };
  }
});
