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
		
		var planet = new Bitmap( type );
		planet.regX = radius / 2;
		planet.regY = radius / 2;
		planet.x = 0;
		planet.y = 0;
		
		this.image = new Image();
		this.image.src = type;
	}
	
	
	// public methods:
	
	p.DisplayObject_draw = p.draw;
	
	p.draw = function( ctx, ignoreCache, time ) {
		
		var angle = time * this.velocity;
		this.x = this.orbit * Math.cos( angle + this.orbit_adjust );
		this.y = this.orbit * Math.sin( angle );
		
		ctx.drawImage(this.image, 0, 0);
		return true;

	}
	
	// private methods:

	window.Planet = Planet;
}(window));