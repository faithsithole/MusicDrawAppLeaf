/*

	Client-side Drawing Board

	p5 Hints
	========
	mouseIsPressed, mouseButton, LEFT, RIGHT
	http://p5js.org/reference/#/p5/mouseButton
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

// my colour palette with the values of the colours that will display on the page
palette = [
	{h: 211, s: 24, b: 44, a: 0.5},
	{h: 176, s: 62, b: 80, a: 0.5},
	{h: 45, s: 68, b: 99, a: 0.5},
	{h: 0, s: 58, b: 100, a: 0.5},
	{h: 354, s: 61, b: 77, a: 0.5}
	];


// buttons
var buttBlack = document.getElementById("button-1");
var buttwhite = document.getElementById("button-2");
var newCanvas = document.getElementById("new");
var songNum = document.getElementById("songTitles");

// brushes
var regBrush = document.getElementById("regular");
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
var myImage1;
var myImage2;
var myImage3
var myMask1;
var myMask2;
var myMask3;
var arraySongs;
// This needs to be global so we can access it from preload, setup & draw


// preload() runs before anything else
function preload() {

	// It is convention to keep your assets (images, sounds, etc.) in assets/
	ndakuvara = loadSound("assets/Ndakuvara.m4a");
	okay = loadSound("https://api.soundcloud.com/tracks/25103033/stream?client_id=97e98adf0edbf76a78de7f80212a88da");
	// headlights = loadSound("https://api.soundcloud.com/tracks/179438798/stream?client_id=97e98adf0edbf76a78de7f80212a88da");
	electricity = loadSound("https://api.soundcloud.com/tracks/169938061/stream?client_id=97e98adf0edbf76a78de7f80212a88da");
	midnight = loadSound("https://api.soundcloud.com/tracks/19087066/stream?client_id=97e98adf0edbf76a78de7f80212a88da");

	//images
	myImage1 = loadImage("assets/imageJ.jpg");
	myMask1 = loadImage("assets/image.png");

	myImage2 = loadImage("assets/grass.jpg");
	myMask2 = loadImage("assets/grassP.png");

	myImage3 = loadImage("assets/leaf.jpg");
	myMask3 = loadImage("assets/leafP.png");


	// arraySongs for drawing
	 arraySongs = [electricity, ndakuvara, midnight, okay];

	// Don't leave this function empty!
	// If you leave it empty, your sketch may never load.  If you don't need
	// preload for your sketch, go ahead and delete the function.
}



function setup() {

	myImage3.mask(myMask3);
	// from = color(354, 61, 77, 0.5 );
	// to = color(45, 68, 99, 0.5);

	// set up background colour using hsb
	myCanvas = createCanvas(windowWidth, windowHeight);
	var backColour = {
		h: 360,
		s: 360,
		b: 360
	};
	background(backColour.h, backColour.s, backColour.b);
	colorMode(HSB, 360, 100, 100, 1);
	strokeCap(ROUND);

	from = color(45, 68, 99, 0.5);
	to = color( 211, 24, 44, 0.5);

	var randHue = random(0, 360);
	newMarker = new Marker(from, 30);
	eraser = new Marker(backColour, 30);


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
		background(360);
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

}

function draw() {
	var p1 = {x: pmouseX, y: pmouseY};
	var p2 = {x: mouseX, y: mouseY};

	songLevel = arraySongs[songIndex].getLevel();
	size = map(songLevel, 0, 1, 30, 500);
	newMarker.thickness = size;

	if (mouseIsPressed) {
		if(mouseButton === LEFT) {
			newMarker.draw(myImage3, size, size, from, to, songLevel*2, size*0.25);
		}
		// else if(mouseButton === RIGHT) {
		// 	eraser.drawLine(p1, p2);
		// }
	}
}
