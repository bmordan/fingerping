if (Meteor.isClient) {

  function step(e,vx,dir){
    
    var x = e.currentTarget.children.markerO.offsetLeft;
    
    if(dir === 'pos'){
      if(x < e.currentTarget.offsetWidth+30){
      
        var nx = x += 5;
        e.currentTarget.children.markerO.style.left = nx + 'px';
        setTimeout(function(){
          step(e,vx,dir)
        },vx);
      }else{
        dir = 'neg';
        step(e,vx,dir);
      }
    }else if(dir === 'neg'){
      if(x > 20){
      
        var nx = x -= 5;
        e.currentTarget.children.markerO.style.left = nx + 'px';
        setTimeout(function(){
          step(e,vx,dir)
        },vx);
      
      }else{
        dir = 'pos';
        step(e,vx,dir);
      }
    }else if(dir === 'stop'){
      e.currentTarget.children.markerO.style.left = '0px';
      e.currentTarget.children.markerO.style.top = e.target.clientHeight/2 + 'px';
    }
    
  };//end of step



  Template.pad.rendered = function(template){
    var delta = $('#delta');
    var el = this.find('#pad');
    
    Hammer(el).on('swipe', function(e){
      e.gesture.preventDefault();

        var ox = e.gesture.center.pageX;
        var oy = e.gesture.center.pageY;  
        var dx = e.gesture.deltaX;
        var dy = e.gesture.deltaY;
        var a = e.gesture.angle;
        var vx = e.gesture.velocityX;
        var vy = e.gesture.velocityX;
        if(vx === 0){
          vx = 0.1;
        }  
      step(e,vx,'pos');
    });
    
    Hammer(el).on('doubletap', function(e){
      e.gesture.preventDefault();
      var dir = 'stop';
      var vx = 0;
      step(e,vx,dir);
    });
    
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
