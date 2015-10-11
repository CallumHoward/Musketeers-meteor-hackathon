Router.configure({
  layoutTemplate: 'layout'
});


Router.route('/', {
  name: 'homepage',
  data: function(){
    return{
      canvases: Canvases.find(),
      elements: Elements.find(),
      themes:   Themes.find(),
    };
  }
});


Router.route('/canvasNew', {
  name: 'canvasNew',
  data: function(){
    return{
      canvases: Canvases.find(),
      elements: Elements.find(),
      themes:   Themes.find(),
    };
  }
});


Router.route('/themesIndex', {
  name: 'themesIndex',
  data: function(){
    return {
      themes: Themes.find();
    };
}):
