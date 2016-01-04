/*
	Client-side Drawing Board
*/
var palette;
var newMarker;
var eraser;
var songLevel;
var size;
var from;
var to;
var songIndex = 0;
var num;
var myCanvas;
var myBrush;

// buttons
var buttBlack = document.getElementById("button-1");
var buttwhite = document.getElementById("button-2");
var newCanvas = document.getElementById("new");

// brushes
var grassBrush = document.getElementById("grass");
var leafBrush = document.getElementById("leaf");

// music controls
var backward = document.getElementById("backward");
var forward = document.getElementById("forward");
var playSong = document.getElementById("play");
var saveDrawing = document.getElementById("save");
var imagewrapDiv = document.getElementById("imagewrap");
var imageDiv = document.getElementById("savedImage");
imagewrapDiv.removeChild(imageDiv);

//  MUSIC SETUP
var song; 
var myImageDraw;
var myImageGrass;
var myImageLeaf;
var myMaskGrass;
var myMaskLeaf;
var arraySongs;
// This needs to be global so we can access it from preload, setup & draw


// preload() runs before anything else
function preload() {
	// It is convention to keep your assets (images, sounds, etc.) in assets/
	ndakuvara = loadSound("assets/Ndakuvara.m4a");
	headlights = loadSound("https://api.soundcloud.com/tracks/179438798/stream?client_id=97e98adf0edbf76a78de7f80212a88da");
	electricity = loadSound("https://api.soundcloud.com/tracks/169938061/stream?client_id=97e98adf0edbf76a78de7f80212a88da");

	//images
	myImageGrass = loadImage("assets/grass.jpg");
	myMaskGrass = loadImage("assets/grassP.png");

	myImageLeaf = loadImage("assets/leaf.jpg");
	myMaskLeaf = loadImage("assets/leafP.png");

	// arraySongs for drawing
	 arraySongs = [electricity, headlights, ndakuvara];
}

function setup() {
	myImageLeaf.mask(myMaskLeaf);
	myImageGrass.mask(myMaskGrass);

	// set up background colour using hsb
	myCanvas = createCanvas(windowWidth, windowHeight);
	var backColour = {
		h: 0,
		s: 0,
		b: 0
	};
	background(backColour.h, backColour.s, backColour.b);
	colorMode(HSB, 360, 100, 100, 1);
	strokeCap(ROUND);

// brush colour ranges
	from = color(45, 68, 99, 0.5);
	to = color( 211, 24, 44, 0.5);

	var randHue = random(0, 360);
	newMarker = new Marker(from, 30);
	eraser = new Marker(backColour, 30);

// initial brush
	myBrush = myImageGrass;


// my events on click
	buttBlack.onclick = function (event) {
		event.preventDefault();
		buttBlack.style.backgroundColor = backColour;
		background(0);
	}

	buttwhite.onclick = function (event) {
		event.preventDefault();
		background(360);
	}

	newCanvas.onclick = function (event) {
		event.preventDefault();
		background(0);
	}

	playSong.onclick = function (event) {
		if (event.target.className === "fa fa-play fa-4x" && arraySongs[songIndex].isPaused) {
			var pauseButton = event.target;
			pauseButton.className = "fa fa-pause fa-4x";
			arraySongs[songIndex].play();
		}
		else if (event.target.className === "fa fa-pause fa-4x" && arraySongs[songIndex].isPlaying) {
			var playS = event.target;
			playS.className = "fa fa-play fa-4x";
			arraySongs[songIndex].pause();
		}
	}

	forward.onclick = function (event) {
		playSong.className = "fa fa-pause fa-4x";
		if (arraySongs[songIndex].isPlaying && songIndex < (arraySongs.length-1)) {
			arraySongs[songIndex].stop();
			songIndex = songIndex + 1;
			arraySongs[songIndex].play();
		}
		else if (arraySongs[arraySongs.length-1].isPlaying) {
			arraySongs[arraySongs.length-1].stop();
			songIndex = 0;
			arraySongs[songIndex].play();
		}
	}

	backward.onclick = function (event) {
		playSong.className = "fa fa-pause fa-4x";
		if (arraySongs[songIndex].isPlaying && songIndex > 0) {
			arraySongs[songIndex].stop();
			songIndex = songIndex - 1;
			arraySongs[songIndex].play();
		}
		else if (arraySongs[0].isPlaying) {
			arraySongs[0].stop();
			songIndex = (arraySongs.length-1);
			arraySongs[songIndex].play();
		}
	}

	saveDrawing.onclick = function (event) {
		var imageUrl = myCanvas.canvas.toDataURL();
		var imageClone = imageDiv.cloneNode(true);
		var savedImage = imageClone.firstElementChild;
		savedImage.setAttribute("src", imageUrl);
		imagewrapDiv.appendChild(imageClone);
		save(myCanvas, 'myCanvas.jpg');
	}

	leafBrush.onclick = function (event) {
		event.preventDefault();
		myBrush = myImageLeaf;
	}

	grassBrush.onclick = function (event) {
		event.preventDefault();
		myBrush = myImageGrass;
	}
}

function draw() {
	var p1 = {x: pmouseX, y: pmouseY};
	var p2 = {x: mouseX, y: mouseY};

	songLevel = arraySongs[songIndex].getLevel();
	size = map(songLevel, 0, 1, 30, 500);
	newMarker.thickness = size;

	if (mouseIsPressed) {
		if(mouseButton === LEFT) {
			newMarker.draw(myBrush, size, size, from, to, songLevel*2, size*0.25);
		}
	}
}
