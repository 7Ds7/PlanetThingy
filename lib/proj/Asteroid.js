/**
* Integration of a Asteroid into easeljs library
* This file is a altered version of easeljs /display/Bitmap.js
* which once instanciated extends/inherits DisplayObject.js from new Bitmap();
**/

	
	
(function(window) {

	
	
	var Asteroid = function( iX, iY, radius, velocity, orbit,orbit_adjust, type ) {
		var img = new Image();
		img.src = "img/" + type + ".png";
	
		// create spritesheet and assign the associated data.
		this.spriteSheet  = new SpriteSheet({
			images: [img],
			frames: {
				width:32, 
				height:32, 
				regX:32, 
				regY:32
			},
			animations: {
				rot_1:[0,0,"Rot1"],
				rot_2:[32,0,"Rot2"],
				rot_3:[64,0,"Rot3"],
				danger:[96,0,"Danger"]
			}
		});
		this.initialize( iX, iY, radius, velocity, orbit,orbit_adjust, type, this.spritesheet );
	}
	var p = Asteroid.prototype = new BitmapAnimation( this.spriteSheet );

	// public properties:
	
	p.image = null;
	p.snapToPixel = true;
	p.sourceRect = null;
	
	// constructor:

	p.DisplayObject_initialize = p.initialize;
	
	p.initialize = function( iX, iY, radius, velocity, orbit,orbit_adjust, type,spritesheet ) {
		
		this.iX = iX;
		this.iY = iY;
		this.regX = radius / 2;
		this.regY = radius / 2;
		this.radius = radius;
		this.velocity = velocity;
		this.orbit = orbit;
		this.type = type;
		this.orbit_adjust = orbit_adjust;
		this.x = iX;
		this.y = iY;
		this.spritesheet = spritesheet;
		
		this.danger = "none";
		
	}
	
	
	// public methods:
	

	
	p.DisplayObject_draw = p.draw;
	
	p.draw = function( ctx, ignoreCache, time ) {
		
		switch ( this.danger ) {
			case "none":
				//console.log("PEACE");
				if ( this.currentFrame !== 3 ) {
					this.gotoAndPlay( this.currentFrame );
				} else {
					this.gotoAndPlay(0);
				}
				break;
			case "warn":
				console.log("DANGER!!");
				this.gotoAndStop(1);
				break;
			case "hit":
				console.log("CABUUUMMM!!");
				this.gotoAndStop(3);
				//console.log( this.parent.removeChild(this ));
				break;
		}
		
		var angle = time * this.velocity;
		this.x +=  this.velocity ;
		this.y +=  this.velocity ;
		this._normalizeFrame();
		var o = this.spriteSheet.getFrame(this.currentFrame);
		if (o == null) {
			return;
		}
		var rect = o.rect;
		// TODO: implement snapToPixel on regX/Y?
		ctx.drawImage(o.image, rect.x , rect.y, rect.width, rect.height, 0, 0, rect.width, rect.height);
		
		/*var g = new Graphics();
		g.beginFill(Graphics.getRGB(0x00,0x00,0xFF,0.5));
		g.drawRect (  0, 0 , this.radius * 2 , this.radius * 2 );
		g.draw( ctx );*/
		return true;
	}
	
	
	
	// private methods:

	window.Asteroid = Asteroid;
}(window));
