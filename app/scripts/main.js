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

  // $('pre').css( 'fontSize', $(window).width()*0.004 );
  var pre = $('pre'),
      prelength = pre.length,
      i = 0;

  var render = function(){
    if(i === prelength) i = 0;
    pre.hide().eq(i).show();
    // var t = pre.eq(i).html();
    // pre.html(t.split('<br>').splice(0,188).join('<br>'));
    i++;
  };

  (function animloop(){
    requestAnimFrame(animloop);
    render();
  })();

});
