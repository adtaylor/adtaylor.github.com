

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
  window.webkitRequestAnimationFrame || 
  window.mozRequestAnimationFrame    || 
  window.oRequestAnimationFrame      || 
  window.msRequestAnimationFrame     || 
  function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
})();


$(document).ready(function(){

  data = $.ajax('/portrait.json');
  data.done(function(d){
    animate(d);
  });

  var render = function(frame) {
    $('#bg').html(frame);
  };

  var animate = function(frames){
    var count = frames.length,
    i = 0;
    console.log('count: ',count);
    var animloop = function(){
      render(frames[i]);
      i = (i == count)? 0 : i+1;
      console.log(i);
      requestAnimFrame(animloop, 1);
    };
    animloop();


  };


});
