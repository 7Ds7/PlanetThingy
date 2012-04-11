/**
* Integration of a Sun into easeljs library
* This file is a altered version of easeljs /display/Bitmap.js
* which once instanciated extends/inherits DisplayObject.js from new Bitmap();
**/

(function(window) {


	var Sun = function(  x, y, radius, ctx, path ) {
		this.initialize(  x, y, radius, ctx, path );
	}
	var p = Sun.prototype = new Bitmap();

	// public properties:
	
	p.image = null;
	p.snapToPixel = true;
	p.sourceRect = null;
	
	// constructor:

	p.DisplayObject_initialize = p.initialize;
	
	p.initialize = function(  x, y, radius,ctx, path ) {
		
		this.regX = radius / 2;
		this.regY = radius / 2;
		this.x = x;
		this.y = y;
				
		this.image = new Image();
		this.image.src = path;
	}
	
	
	// public methods:
	
	// At the moment the sun do not need to be redrawn
/*
	p.DisplayObject_draw = p.draw;
	
	p.draw = function( ctx, ignoreCache, time ) {
		//console.log("draw Sun");
		ctx.drawImage(this.image, 0, 0);
		return true;

	}
*/
	
	// private methods:

	window.Sun = Sun;
}(window));
