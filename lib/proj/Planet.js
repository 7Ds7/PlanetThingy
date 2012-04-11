/**
* Integration of a Planets into easeljs library
* This file is a altered version of easeljs /display/Bitmap.js
* which once instanciated extends/inherits DisplayObject.js from new Bitmap();
**/

(function(window) {


	var Planet = function( radius, velocity, orbit, orbit_adjust, type ) {
		this.initialize( radius, velocity, orbit, orbit_adjust, type );
	}
	var p = Planet.prototype = new Bitmap();

	// public properties:
	p.snapToPixel = true;
	p.sourceRect = null;
	
	// save our Parent's constructor
	p.Bitmap_initialize = p.initialize;

    // our constructor
	p.initialize = function( radius, velocity, orbit,orbit_adjust, type ) {
        // call our Parent's constructor
		this.Bitmap_initialize( "img/" + type + ".gif" );

        // own properties
		this.regX = radius / 2;
		this.regY = radius / 2;
		this.radius = radius;
		this.velocity = velocity;
		this.orbit = orbit;
		this.type = type;
		this.orbit_adjust = orbit_adjust;
		this.x = 0;
		this.y  = 0;
	}
	
	
	// public methods:
	p.update = function( time ) {
		var angle = time * this.velocity;
		this.x = this.orbit * Math.cos( angle + this.orbit_adjust * window.time );
		this.y = this.orbit * Math.sin( angle );

		return true;
	}

	window.Planet = Planet;
}(window));
