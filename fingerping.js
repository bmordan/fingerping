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
      
      function moveUpRight(e){
        var v = ((e.gesture.velocityX+e.gesture.velocityY)/2)*100;
        var a = Math.round(e.gesture.angle)*-1;
        var clientWidthSplitRight = e.currentTarget.clientWidth - e.currentTarget.children.markerO.offsetLeft;
        var clientWidthSplitLeft = e.currentTarget.children.markerO.offsetLeft;
        var movex = v/clientWidthSplitLeft;
        
        if(e.currentTarget.children.markerO.offsetLeft > e.currentTarget.clientWidth){
          return;
        }else{
          console.log(a);
          console.log(clientWidthSplitRight+'|'+movex);
          console.log(e.currentTarget.children.markerO.style.left);
          console.log(e.currentTarget.children.markerO.offsetLeft);
          console.log(v);
        }
      };
      
      console.log(e);
      var ox = e.gesture.touches[0].pageX-10;
      var oy = e.gesture.touches[0].pageY-10;
      var a = Math.round(e.gesture.angle);
      var v = (e.gesture.velocityX+e.gesture.velocityX)*10;
      var dir = e.gesture.direction;
      var cw = e.currentTarget.clientWidth;
      var ch = e.currentTarget.clientHeight;
      if(a < 0 && dir === 'right'){
        
        delta[0].innerHTML = '+x+y ';
        var X = cw - ox;
        var Y = Math.tan(a)*X; Y = Y*-1;
        moveUpRight(e);
      
      }else if(a < 0 && dir === 'left'){
        
        delta[0].innerHTML = '-x+y ';
        delta[0].innerHTML += ox;

      
      }else if(a > 0 && dir === 'right'){
        
        delta[0].innerHTML = '+x-y ';
        delta[0].innerHTML += ox;

      
      }else if(a > 0 && dir === 'left'){
        
        delta[0].innerHTML = '-x-y ';
        delta[0].innerHTML += ox;

      
      }
      e.currentTarget.children.markerO.style.left = ox + 'px';
      e.currentTarget.children.markerO.style.top = oy + 'px';
      
      
      
    });
    
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
