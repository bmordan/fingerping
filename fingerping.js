if (Meteor.isClient) {

  function decay(e){
    
    var x = e.currentTarget.children.markerO.offsetLeft;
    
  };//end of step



  Template.pad.rendered = function(template){
    
    var delta = $('#delta');
    var el = this.find('#pad');
      
    Hammer(el).on('touch drag', function(e){
      e.gesture.preventDefault();
      e.currentTarget.children.markerO.style.left = e.gesture.touches[0].pageX-10 + 'px';
      e.currentTarget.children.markerO.style.top = e.gesture.touches[0].pageY-10 + 'px';  
    });
    
    Hammer(el).on('dragend', function(e){
      
      function move(e){
        var vx = Math.round(e.gesture.velocityX*100);
        var vy = Math.round(e.gesture.velocityY*100);
        e.currentTarget.children.markerO.style.left += vx + 'px';
        e.currentTarget.children.markerO.style.top += vy + 'px';
      };
      
      //console.log(e);
      var a = Math.round(e.gesture.angle);
      var dir = e.gesture.direction;
      var w = e.currentTarget.clientWidth;
      var h = e.currentTarget.clientHeight;
      var ox = e.currentTarget.children.markerO.offsetLeft;
      var oy = e.currentTarget.children.markerO.offsetTop;
      var vx = Math.round(e.gesture.velocityX*100);
      var vy = Math.round(e.gesture.velocityY*100);
      var dt = e.timeStamp
      //visual deltas
      
      
      if(a < 0 && dir === 'right'){
        
        delta[0].innerHTML = '+x+y ';
        move(e);
       
      }else if(a < 0 && dir === 'left'){
        
        delta[0].innerHTML = '-x+y ';
  
      }else if(a > 0 && dir === 'right'){
        
        delta[0].innerHTML = '+x-y ';
        
      }else if(a > 0 && dir === 'left'){
        
        delta[0].innerHTML = '-x-y ';
      
      }
      
      e.currentTarget.children.delta.innerHTML += 'ox:'+ox+' oy:'+oy+' vx:'+vx+' vy:'+vy+' w:'+w+' h:'+h;
      
    });
    
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
