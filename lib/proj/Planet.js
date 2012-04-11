/**
* Integration of a Planets into easeljs library
* This file is a altered version of easeljs /display/Bitmap.js
* which once instanciated extends/inherits DisplayObject.js from new Bitmap();
**/

(function(window) {

	var Planet = function( radius, velocity, orbit, orbit_adjust, type, index ) {
		this.initialize( radius, velocity, orbit, orbit_adjust, type, index );
	}

	var p = Planet.prototype = new Bitmap();
	
	// public properties:

	p.snapToPixel = true;
	p.sourceRect = null;
	
	// save Parent constructor for later
	p.Bitmap_initialize = p.initialize;
	
	var instance = p.initialize = function( radius, velocity, orbit, orbit_adjust, type, index ) {
        // call our Parent constructor
        p.Bitmap_initialize( "img/" + type + ".gif" );

        console.log(  "img/" + type + ".gif" );

        // now on to our own logic
		this.regX = radius / 2;
		this.regY = radius / 2;
		this.radius = radius;
		this.velocity = velocity;
		this.orbit = orbit;
		this.type = type;
		this.orbit_adjust = orbit_adjust;
		this.x = 0;
		this.y = 0;
		this.adjust_orbit = false;
		this.orbit_index = index;
		
		this.drawOrbit ( 0, 0, orbit );
	}
	
	
	// public methods:
	
	p.update = function( time ) {
		var angle = time * this.velocity;
		this.x = this.orbit * Math.cos( angle + this.orbit_adjust * window.time ) - ( this.radius / 2 );
		this.y = this.orbit * Math.sin( angle ) - ( this.radius / 2 );

		console.log(this.adjust_orbit);
		if ( this.adjust_orbit ) {
			this.adjustOrbit();
		}
		return true;
	}
	
	p.drawOrbit = function( x, y, orbit ) {
		
		console.log("drawOrbit");
		var g = new Graphics(),
		s;
		g.setStrokeStyle(2);
		g.beginStroke( Graphics.getRGB( 255,255,255) );
		g.arc (  x,  y, orbit , 0 , 360 , true )
		s = new Shape( g );
		s.alpha = 0.5;
		container_orbits.addChild( s );
		console.log(container_orbits.children.length);
		this.orbit_index = container_orbits.children.length -1 ;
		console.log(this.orbit_index);
	}
	
	p.adjustOrbit = function () {
		console.log("adjustOrbit()");
		
		// Array Remove - By John Resig (MIT Licensed)
		/*Array.prototype.remove = function(from, to) {
			var rest = this.slice((to || from) + 1 || this.length);
			this.length = from < 0 ? this.length + from : from;
			return this.push.apply(this, rest);
		};
		
		
		console.log( this.orbit_index );
		console.log( container_orbits.children);
		container_orbits.children.remove( this.orbit_index );
		console.log( container_orbits.children );
		
		this.adjust_orbit = false;*/
		
		console.log("adjustOrbit");
		var g = new Graphics();
		g.beginFill(Graphics.getRGB(255,0,0));
		g.drawCircle( 0,0, 0.5 );
		var s = new Shape(g);
		s.x = this.x + ( this.radius / 2 );
		s.y = this.y + ( this.radius / 2 );
		container_orbits.addChild( s );
	}
	
	// private methods:

	window.Planet = Planet;
}(window));