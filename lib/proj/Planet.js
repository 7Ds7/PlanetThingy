/**
* Integration of a Planets into easeljs library
* This file is a altered version of easeljs /display/Bitmap.js
* which once instanciated extends/inherits DisplayObject.js from new Bitmap();
**/

(function(window) {


	var Planet = function( radius, velocity, orbit,orbit_adjust, type ) {
		this.initialize( radius, velocity, orbit,orbit_adjust, type );
	}
	var p = Planet.prototype = new Bitmap();

	// public properties:
	
	p.image = null;
	p.snapToPixel = true;
	p.sourceRect = null;
	
	// constructor:

	p.DisplayObject_initialize = p.initialize;
	
	p.initialize = function( radius, velocity, orbit,orbit_adjust, type ) {
		
		this.regX = radius / 2;
		this.regY = radius / 2;
		this.radius = radius;
		this.velocity = velocity;
		this.orbit = orbit;
		this.type = type;
		this.orbit_adjust = orbit_adjust;
		this.x = 0;
		this.y  = 0;
		this.image = new Image();
		this.image.src = "img/" + type + ".gif";
	}
	
	
	// public methods:
	
	p.DisplayObject_draw = p.draw;
	
	p.draw = function( ctx, ignoreCache, time ) {
		var angle = time * this.velocity;
		this.x = this.orbit * Math.cos( angle + this.orbit_adjust * window.time );
		this.y = this.orbit * Math.sin( angle );
		
		ctx.drawImage(this.image, 0, 0);
		/*var g = new Graphics();
		g.beginFill(Graphics.getRGB(0x00,0x00,0xFF,0.5));
		g.drawRect (  0, 0 , this.radius * 2 , this.radius * 2 );
		g.draw( ctx );*/
		return true;
	}
	
	// private methods:

	window.Planet = Planet;
}(window));
