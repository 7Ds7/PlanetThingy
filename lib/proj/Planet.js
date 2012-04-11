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
		/*this.x = 0;
		this.y = 0;*/
		this.image = new Image();
		this.image.src = "img/" + type + ".gif";
		this.adjust_orbit = false;
		this.orbit_index = 0;
		
		p.drawOrbit ( 0, 0, orbit );
	}
	
	
	// public methods:

	p.DisplayObject_draw = p.draw;
	
	p.draw = function( ctx, ignoreCache, time ) {
		var angle = time * this.velocity;
		this.x = this.orbit * Math.cos( angle + this.orbit_adjust * window.time ) - ( this.radius / 2 );
		this.y = this.orbit * Math.sin( angle ) - ( this.radius / 2 );7
		
		
		ctx.drawImage( this.image, 0, 0 );
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
		orbit_index = container_orbits.children.length -1 ;
		console.log(orbit_index);
	}
	
	p.adjustOrbit = function () {
		console.log( p.orbit_index );
		//container_orbits.children.splice( this.orbit_index ,1 );
		console.log("adjustOrbit");
		/*var g = new Graphics();
		g.beginFill(Graphics.getRGB(255,0,0));
		g.drawCircle( 0,0, 0.5 );
		var s = new Shape(g);
		s.x = this.x;
		s.y = this.y;
		container_orbits.addChild( s );*/
	}
	
	// private methods:

	window.Planet = Planet;
}(window));
