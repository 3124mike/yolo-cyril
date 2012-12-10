var init=function(){
	process.stdin.on('data', function(char, key){
		if(char == 'q'){
			console.log("Quitting...");
			process.exit();
		}
		console.log("data, char=" + char + ", key=" + key);
	});
	
	var tty = require('tty');
	tty.setRawMode(true);
	process.stdin.resume();

}


var tick = function(){
	setTimeout(tick, 100);
}


init();
tick();

