if (Meteor.isClient) {

  function step(e,vx,dir){
    
    var x = e.currentTarget.children.markerO.offsetLeft;
    
    if(dir === 'stop'){
      setTimeout(function(){
        e.currentTarget.children.markerO.style.left = '0px';
        e.currentTarget.children.markerO.style.top = e.target.clientHeight/2 + 'px';
        return;
      },vx);   
    }else if(dir === 'pos'){
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
        
        if(dx > 0){
          var dir = 'pos';
          e.currentTarget.children.markerO.style.left = e.currentTarget.children.markerO.offsetLeft + 'px';
          e.currentTarget.children.markerO.style.top = e.target.clientHeight/2 + 'px';
        }else{
          var dir = 'neg';
          e.currentTarget.children.markerO.style.left = e.currentTarget.children.markerO.offsetLeft + 'px';
          e.currentTarget.children.markerO.style.top = e.target.clientHeight/2 + 'px';
        }

      //step triggers animation  
      step(e,vx,dir);
      
    });
    
    Hammer(el).on('doubletap', function(e){
      e.gesture.preventDefault();
      step(e,100,'stop');
    });
    
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
