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

  var pre = $('pre'),
      prelength = pre.length,
      i = y = 0;

  var render = function(){
    if(i === (prelength-1)) i = 0;
    pre.hide().eq(i).show();
    pre.css('color', 'rgba(255,0,0,' + (y*0.001) + ')');
    // var t = pre.eq(i).html().split('<br>');
    // var ts = t.splice(0,150);
    // pre.eq(i).html(ts.join('<br>'));
    i++;
  };

  (function animloop(){
    y++;
    if(y%20 === 0) render();
    if(y === 10000) y = 0;
    requestAnimFrame(animloop);
  })();

});
