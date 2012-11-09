// The Paul Irish Request Animation Frame Shim
//
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function(){ /* Do nothing on older browsers as this isn't too efficent.  */ };
})();

// Simple class to keep concerns nicely
// seperated.
//
AnimateMe = (function() {

  function AnimateMe() {
    var self = this;
    this.bg = $('#bg');
    this.pre = $('pre');
    this.prelength = this.pre.length;
    this.i = 1;
    this.y = this.x = 0;
    
    this.setSize();
    this.bg.first().show();
    $(window).on('resize', function(){ self.setSize(); });
  }

  AnimateMe.prototype.setSize = function() {
    var width = $(window).width()
      , ratio = (width<500) ? 0.0075 : 0.003;
    this.bg.css('fontSize', width*ratio);
  };

  AnimateMe.prototype.loop = function() {
    var self = this;
    this.y++;
    this.x++;
    if(this.y%18 === 0 && this.x < 300) this.render();
    if(this.x === 1500) this.x = 0;
    if(this.y === 1000) this.y = 0;
    if(this.y%200 === 0) this.changeColor((this.y*0.01)/2);
    requestAnimFrame(function(){ self.loop();});
  };

  AnimateMe.prototype.changeColor = function(colorStep) {
    this.bg.attr('class', 'bg-'+(colorStep+1));
  };

  AnimateMe.prototype.render = function() {
    if(this.i === (this.prelength-1)) this.i = 0;
    this.pre.hide().eq(this.i).show();
    this.i++;
  };

  return AnimateMe;

})();

// Initate the class when the DOM is ready
// and jQuery is ready to go.
$(document).ready(function(){
  window.animateMe = new AnimateMe();
  animateMe.loop();
});
