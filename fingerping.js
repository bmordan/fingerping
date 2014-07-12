if (Meteor.isClient) {

  function move(e,v,dir){
    
    var x = e.currentTarget.children.markerO.offsetLeft;
    var y = e.currentTarget.children.markerO.offsetTop;
    var dv = 60;
    switch(dir){
      case 'rightup':
        if(x > e.currentTarget.clientWidth && y > 0){
          e.currentTarget.children.markerO.style.left = (x-v) + 'px';
          e.currentTarget.children.markerO.style.top = (y-v) + 'px';
          setTimeout(function(){move(e,v,'leftup');},dv);
        }else if(y < 0 && x < e.currentTarget.clientWidth){
          e.currentTarget.children.markerO.style.left = (x+v) + 'px';
          e.currentTarget.children.markerO.style.top = (y+v) + 'px';
          setTimeout(function(){move(e,v,'rightdown');},dv);
        }else{
          e.currentTarget.children.markerO.style.left = (x+v) + 'px';
          e.currentTarget.children.markerO.style.top = (y-v) + 'px';
          setTimeout(function(){move(e,v,'rightup');},dv);
        }
        break;
      case 'rightdown':
        if(x > e.currentTarget.clientWidth && y > 0){
          e.currentTarget.children.markerO.style.left = (x-v) + 'px';
          e.currentTarget.children.markerO.style.top = (y+v) + 'px';
          setTimeout(function(){move(e,v,'leftdown');},dv);
        }else if(y > e.currentTarget.clientHeight && x < e.currentTarget.clientWidth){
          e.currentTarget.children.markerO.style.left = (x+v) + 'px';
          e.currentTarget.children.markerO.style.top = (y-v) + 'px';
          setTimeout(function(){move(e,v,'rightup');},dv);
        }else{
          e.currentTarget.children.markerO.style.left = (x+v) + 'px';
          e.currentTarget.children.markerO.style.top = (y+v) + 'px';
          setTimeout(function(){move(e,v,'rightdown');},dv);
        }
        break;
      case 'leftup':
        if(x < 0 && y > 0){
          e.currentTarget.children.markerO.style.left = (x+v) + 'px';
          e.currentTarget.children.markerO.style.top = (y-v) + 'px';
          setTimeout(function(){move(e,v,'rightup');},dv);
        }else if(y < 0 && x > 0){
          e.currentTarget.children.markerO.style.left = (x-v) + 'px';
          e.currentTarget.children.markerO.style.top = (y+v) + 'px';
          setTimeout(function(){move(e,v,'leftdown');},dv);
        }else{
          e.currentTarget.children.markerO.style.left = (x-v) + 'px';
          e.currentTarget.children.markerO.style.top = (y-v) + 'px';
          setTimeout(function(){move(e,v,'leftup');},dv);
        }
        break;
      case 'leftdown':
        if(x < 0 && y > 0){
          e.currentTarget.children.markerO.style.left = (x+v) + 'px';
          e.currentTarget.children.markerO.style.top = (y+v) + 'px';
          setTimeout(function(){move(e,v,'rightdown');},dv);
        }else if(y > e.currentTarget.clientHeight && x > 0){
          e.currentTarget.children.markerO.style.left = (x-v) + 'px';
          e.currentTarget.children.markerO.style.top = (y-v) + 'px';
          setTimeout(function(){move(e,v,'leftup');},dv);
        }else{
          e.currentTarget.children.markerO.style.left = (x-v) + 'px';
          e.currentTarget.children.markerO.style.top = (y+v) + 'px';
          setTimeout(function(){move(e,v,'leftdown');},dv);
        }
        break;
      case 'stop':
        var x = e.currentTarget.clientWidth / 2;
        var y = e.currentTarget.clientHeight / 2;
        e.currentTarget.children.markerO.style.left = (x-10) + 'px';
        e.currentTarget.children.markerO.style.top = (y-10) + 'px';
        return;
        break;       
    }
    
  };

  Template.pad.rendered = function(template){
    
    var delta = $('#delta');
    var el = this.find('#pad');
      
    Hammer(el).on('touch drag', function(e){
      e.gesture.preventDefault();
      e.currentTarget.children.markerO.style.left = e.gesture.touches[0].pageX-10 + 'px';
      e.currentTarget.children.markerO.style.top = e.gesture.touches[0].pageY-10 + 'px';  
    });
    
    Hammer(el).on('dragend', function(e){
      
      
      var a = Math.round(e.gesture.angle);
      var dir = e.gesture.direction;
      var v = ((e.gesture.velocityX+e.gesture.velocityY)/2)*100;
      
      if(a < 0 && dir === 'right'){
        move(e,v,'rightup');
      }else if(a < 0 && dir === 'left'){
        move(e,v,'leftup');  
      }else if(a > 0 && dir === 'right'){
        move(e,v,'rightdown');
      }else if(a > 0 && dir === 'left'){
        move(e,v,'leftdown');
      }
      
      //e.currentTarget.children.delta.innerHTML = 'ox:'+ox+' oy:'+oy+' v:'+v+' a:'+a+' vx:'+vx+' vy:'+vy+' w:'+w+' h:'+h;
      
    });
    
    Hammer(el).on('swipe', function(e){
      move(e,0,'stop');
    });
    
  }
    
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
