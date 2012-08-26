(function($) {

  "use strict";


  // Set variables
  //

  var $body = $('body'),
      $window = $(window),
      pageWidth = $window.width(),
      pageHeight = $window.height(),
      spacing = 50,
      radius = 20,
      transformProp = Modernizr.prefixed('transform'),
      isTouch = !!('createTouch' in document),
      HALF_ROOT_3 = Math.sqrt(3) / 2,
      // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
      requestAnimFrame = (function(){
        return  window.requestAnimationFrame       || 
                window.webkitRequestAnimationFrame || 
                window.mozRequestAnimationFrame    || 
                window.oRequestAnimationFrame      || 
                window.msRequestAnimationFrame     || 
                function( callback, element){
                  window.setTimeout(callback, 1000 / 60);
                };
      })();


  // Events Names
  //

  $.EVENTS = {
    START : isTouch ? 'touchstart' : 'mousedown',
    MOVE : isTouch ? 'touchmove' : 'mousemove',
    END : isTouch ? 'touchend' : 'mouseup'
  };



  // Trinkets
  //

  function Trinket( cabinet, x, y ) {
    this.cabinet = cabinet;
    this.x = x;
    this.y = y;

    this.render();
  }

  Trinket.prototype.render = function() {
    var el = this.el = document.createElement('div');
    el.className = "trinket";
    el.x = this.x;
    el.y = this.y;

    console.log(this);
    this.cabinet.element.appendChild( el );

    this.place();
  };

  Trinket.prototype.place = function() {
    this.el.style[ transformProp ] = 'translate3d(' + this.x + 'px, ' + this.y + 'px, 0 ) scale3d(1, 1, 1)';
  };


  // Cabinate
  //
  // A store for all the trinkets on the page
  
  function Cabinet ( element ) {
    this.element = element;
    var x,
        y,
        rows = Math.ceil( pageHeight / spacing, 0 ),
        cols = Math.ceil( pageWidth / spacing, 0 );

    for (var r = 0; r < rows; r += 1) {
      y = r * spacing;
      for (var c = 0; c < cols; c += 1) {
        x = c * spacing;
        var n = new Trinket( this, x, y );
      }
    }
  }


  $.cabinet = function ( elements ) {
    elements.each(
      function(el) {
        new Cabinet( el );
      }
    );
  };


  //
  // Auto instantiate
  //

  $.Instantiate = function () {
    $( '[data-script]' ).each(
      function( el ) {
        var $el = $(el),
            scriptName = $el.attr( 'data-script' );
        if( $[ scriptName ] )
          $[ scriptName ]( $el );
      }
    );
  };


  //
  // DOM Ready
  //

  $.domReady(function(){
    $.Instantiate();
  });

})(ender);
