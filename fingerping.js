if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to fingerping.";
  };

  Template.pad.rendered = function(template){
    var delta = $('#delta');
    var el = this.find('#pad');
    
    Hammer(el).on('swipe', function(e){
      e.gesture.preventDefault();
      delta[0].innerHTML = 'hi';
    });
    
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
