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
