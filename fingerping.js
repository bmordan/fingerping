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
      console.log(e);
      var ox = e.gesture.touches[0].pageX-10;
      var oy = e.gesture.touches[0].pageY-10;
      var a = e.gesture.angle;
      var vx = e.gesture.velocityX;
      var vy = e.gesture.velocityY;
      var dir = e.gesture.direction;
      var cw = e.currentTarget.clientWidth;
      var ch = e.currentTarget.clientHeight;
      if(a < 0 && dir === 'right'){
        
        delta[0].innerHTML = '+y+x ';
        delta[0].innerHTML += (ox-cw)*-1;
        delta[0].innerHTML += ',';
        delta[0].innerHTML += ((ch-oy)-ch)*-1;
      
      }else if(a < 0 && dir === 'left'){
        
        delta[0].innerHTML = '+y-x ';
        delta[0].innerHTML += ((cw-ox)-cw)*-1;
        delta[0].innerHTML += ',';
        delta[0].innerHTML += ((ch-oy)-ch)*-1;
      
      }else if(a > 0 && dir === 'right'){
        
        delta[0].innerHTML = '-y+x ';
        delta[0].innerHTML += (ox-cw)*-1;
        delta[0].innerHTML += ',';
        delta[0].innerHTML += ch-oy;
      
      }else if(a > 0 && dir === 'left'){
        
        delta[0].innerHTML = '-y-x ';
        delta[0].innerHTML += ((cw-ox)-cw)*-1;
        delta[0].innerHTML += ',';
        delta[0].innerHTML += (oy-ch)*-1;
      
      }
      e.target.children.markerO.style.left = ox + 'px';
      e.target.children.markerO.style.top = oy + 'px';
      
    });
    
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
