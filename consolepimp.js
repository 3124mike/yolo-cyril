/*
 *  Screen Methods 
 */

var screen = {
	width:	process.stdout.getWindowSize()[0] - 1, 
	height:	process.stdout.getWindowSize()[1] - 1, 
}

var cursor = {
	x:Math.round(screen.width / 2), 
	y:Math.round(screen.height /2),
	lastX:0,
	lastY:0, 
	icon:"*"
};

exports.clear = function(fill){

	if(typeof(fill) == 'undefined'){
		for(var c = 0; c < height; c++){
			process.stdout.write("\n");
		}
	} else {
		var screenLimit = height * width;
		var fillLength = fill.toString().length;
		var iterations = screenLimit / fillLength;
		for(var c = 0; c < iterations; c++){
			process.stdout.write(fill.toString());
		}
	}
}

var redrawCursor= function(){
	process.stdout.cursorTo(cursor.lastX, cursor.lastY);
	process.stdout.write(' ');
	process.stdout.cursorTo(cursor.x, cursor.y);
	process.stdout.write(cursor.icon + '\033[1D');
	cursor.lastX = cursor.x;
	cursor.lastY = cursor.y;
}



var redraw = function(){
	redrawCursor();
}


/*

#### Keyboard Methods ####

*/

var initKeyboard = function(){
	process.stdin.on('data', onData);
	var tty = require('tty');
	tty.setRawMode(true);
	process.stdin.resume();
}

var onData = function(ch){
	resolveKey(ch.toString());
}

var resolveKey = function(key){
	switch(key){
		case 'q':	process.exit();
				break;

		case 'h': 	if(cursor.x > 0) cursor.x--;	
				break;

		case 'l':	if(cursor.x < screen.width) cursor.x++;	
				break;

		case 'k':	if(cursor.y > 0) cursor.y--;
				break;

		case 'j':	if(cursor.y < screen.height) cursor.y++;
				break;
	}
}



/*

#### Program Loop ####

*/


var tick = function(x){
	redraw();
	setTimeout(tick, x, x);
}

exports.start = function(x){
	if(process.stdin.listeners('on').length == 0) initKeyboard();
	if(typeof(x) != 'number' ) x = 10;
	tick(x);
}
