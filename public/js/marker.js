function Marker (colour, thickness) {
	this.colour = colour;
	this.thickness = thickness;
}

Marker.prototype.draw = function(myImage, imgHeight, imgWidth, from, to, amt, rotationX) {
	var lerped = lerpColor(from, to, amt);
	tint(lerped);
	translate(mouseX, mouseY, 0);
	rotate(rotationX);
	imageMode(CENTER);
	image(myImage, 0, 0, imgHeight, imgWidth);
}