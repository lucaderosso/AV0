/* --------------------------------------------------------------------

AV0 — A framework to experiment live human-computer collaboration in 
the audio visual field
Copyright (C) 2017 Luca De Rosso

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301  USA

-----------------------------------------------------------------------

Author: Luca De Rosso
Website: http://www.lucaderosso.com/

Instagram: @lucaderosso
Twitter: @lucaderosso
Facebook: facebook.com/derossoluca
Pinterest: pinterest.com/lucaderosso
Github: https://github.com/lucaderosso/AV0

---------------------------------------------------------------------*/



// —————————————————————————————————————————————————————
// SETTING UP: jit.window / jit.gl.render, jit.gl.sketch
// —————————————————————————————————————————————————————

var myMatrix = new JitterObject("jit.matrix", "mat"); //
myMatrix.dim = [1280, 1024];

var myWindow = new JitterObject("jit.window", "video-window"); //
myWindow.floating = 0;
myWindow.size = [720, 450];
myWindow.pos = [0, 0];
myWindow.fsaa = 1;
myWindow.floating = 0;
myWindow.border = 1;
myWindow.fullscreen = 0;
myWindow.usedstrect = 1;
myWindow.depthbuffer = 0; // to enable transparency
myWindow.fsmenubar = 0;

var myRender = new JitterObject("jit.gl.render", "video-window");
myRender.erase_color = [0, 0, 0, 1]; // change last value to set background opacity
myRender.high_res = 1;
myRender.ortho = 2;

var mySketch = new JitterObject("jit.gl.sketch", "video-window");
mySketch.blend_enable = 1; //because we are working with transparency
mySketch.antialias = 1;
// mySketch.position = [-0.5, 0, 0];
// mySketch.automatic = 0;



// ————
// GRID
// ————

// this could throw you off. 
// myGrid is not the actual grid on which shapes are positioned but rather another shape used to visualize lines matching the characteristics of the grid's values calculated gird in newGrid() 
var myGrid = new JitterObject("jit.gl.gridshape", "video-window");
myGrid.blend_enable = 1; //because we are working with transparency
myGrid.shape = "plane";
myGrid.gl_color = [0.8, 0.8, 0.8, 0.1]; 
myGrid.gridmode = 0;
myGrid.poly_mode = 2;
var thisPointSize = 4; // double when using projectors;
myGrid.point_size = thisPointSize;
myGrid.line_width = 2; 



// —————————
// VARIABLES
// —————————

var viewPortStatus = 0;
var viewPortAspectRatio = [16, 8];
var screenResolution = [1440, 900]; // setting widow size as a default value

var withRatio; // width ratio based on screen size
var heightRatio; // height ratio based on screen size
var viewPortLeft; // window left cohordinate
var viewPortRight; // window right cohordinate
var viewPortBottom; // window bottom cohordinate
var viewPortTop; // window top cohordinate
var windowWidth;
var windowHeight;

var subdivisions;
var increment;
var horizontalRes;
var verticalRes;



// ———————
// CLASSES
// ———————

// Vector class used to position and move shapes
var Vector = {
	x: 0.0,
	y: 0.0,
	z: 0.0,

	add:function(Vector){
		this.x += Vector.x;
		this.y += Vector.y;
		this.z += Vector.z;
	}
};

// Color class
var Color = {
	r: 0,
	g: 0,
	b: 0,
	a: 1,

	add:function(Color){
		this.r = Color.r;
		this.g = Color.g;
		this.b = Color.b;
		this.a = Color.a;
	}
};



// ———————
// OBJECTS
// ———————

// The Layer object is used to host all shapes generated for each layer  
function Layer() {
	this.shapes = [];
	this.sustain = false;
	this.drawing = false;
}

Layer.prototype.toDraw = function(){
	// this method returns a boolean that is then used in the draw() method 
	// in main.js to decide wether or not the layer's shapes have to be drawn
	if(this.shapes.length > 0){
		// check if lifespan is > 0 to update the value of this.drawing
		this.checkIfShapesAreFading();
		// define wether or not it this layer should be drawn
		if(this.sustain == true || this.drawing == true){
			return true;
		} else {
			return false;
		}
	}
}

Layer.prototype.checkIfShapesAreFading = function(){
	// not the most efficient way because it's checking all shapes (?!)
	// consider breaking the loop if one condition is met (?!)
	for(var i = 0; i < this.shapes.length; i++){
		if(this.shapes[i].lifespan > 0){
			this.drawing = true;
		} else {
			this.drawing = false;
		}
	}
}

// The Line object was before used to draw the grid too but now it's used only for displaying the progressBar
function Line(startX, startY, endX, endY){
	// start point
	this.startPoint = Object.create(Vector);
	this.startPoint.x = startX;
	this.startPoint.y = startY;
	this.startPoint.z = 0;
	// end point
	this.endPoint = Object.create(Vector);
	this.endPoint.x = endX;
	this.endPoint.y = endY;
	this.endPoint.z = 0;
	// color
	this.color = Object.create(colorWhite);
	this.color.r = 0.3;
	this.color.g = 0.3;
	this.color.b = 0.3;
}

Line.prototype.display = function(){
	mySketch.glpushmatrix();
	mySketch.glcolor(this.color.r, this.color.g, this.color.b, this.color.a);
	mySketch.quad(this.startPoint.x, this.startPoint.y, 0, this.startPoint.x, this.startPoint.y + 0.002, 0, this.endPoint.x, this.endPoint.y + 0.002, 0, this.endPoint.x, this.startPoint.y, 0);
	mySketch.glpopmatrix();
}

Line.prototype.run = function(){
	this.display();
}



// ———————————————
// DEBUGGING TOOLS
// ———————————————

// this method is used to scale manually mySketch and myGrid
function manualScale(factor){ 
	mySketch.scale = [factor, factor, 1];
	myGrid.scale = [withRatio * factor, heightRatio * factor, 1];
}



// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// USER SETUP INPUTS: methods to setup video output according to output device's resolution and desired aspect ratio
// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————

// This method allows to enter myWindow in full screen 
function fullScreen(toggle){
	myWindow.fullscreen = toggle;
}

// This method toggles a viewPort useful for debugging and calibrating projector on the screen
function toggleViewPort(toggle){
	viewPortStatus = toggle;	
}

// this method takes the with and height of the output screen as paramenters which are then used to calculate viewPort size and to scale mySketch
function assignScreenResolution(width, height){
	// these values are used for calculations in the following methods
	screenResolution[0] = width;
	screenResolution[1] = height;
	// update non-fullscreen window size 
	myWindow.size = [width/2, height/2];
	calculateSizesForViewPort();
	scaleSketch();
}

// this method is to toggle the floating property for the window
function toggleFloatingForWindow(toggle){
	myWindow.floating = toggle;
}

// this method is to toggle the border property for the window
function toggleBorderForWindow(toggle){
	myWindow.border = toggle;
}

// this method is to toggle window's visibility
function toggleVisibilityForWindow(toggle){
	myWindow.visible = 1 - toggle;
}

// this method sets the viewport aspect ratio. Note: this aspect ratio can differ from the output screen's one.
function assignViewPortAspectRatio(width, height){
	// these values are used for calculations in the following methods
	viewPortAspectRatio[0] = width;
	viewPortAspectRatio[1] = height;
	calculateSizesForViewPort();
	updateBrogressBarLocation();
	newGrid(8)
	scaleSketch();
}



// ———————————————————————————————————————————————————————————————————————————
// INTERNAL METHODS: aka method that are not directly controlled by user input
// ———————————————————————————————————————————————————————————————————————————

// This method clears all shapes for all layers
function clearAll() {
	layer1.shapes = [];
	layer2.shapes = [];
	layer3.shapes = [];
	layer4.shapes = [];
}

// This method calulates viewPorts bounds and sizes relatively to myWindow 
function calculateSizesForViewPort(){
	if(viewPortAspectRatio[0] <= viewPortAspectRatio[1]){
		withRatio = viewPortAspectRatio[0] / viewPortAspectRatio[1]; // width ratio based on screen size
		heightRatio = 1; // height ratio based on screen size		
	} else if(viewPortAspectRatio[0] > viewPortAspectRatio[1]){
		withRatio = 1; // width ratio based on screen size
		heightRatio = viewPortAspectRatio[1] / viewPortAspectRatio[0]; // height ratio based on screen size
	}
	viewPortLeft = -withRatio; // window left cohordinate
	viewPortRight = withRatio; // window right cohordinate
	viewPortBottom = -heightRatio; // window bottom cohordinate
	viewPortTop = heightRatio; // window top cohordinate
	windowWidth = Math.abs(viewPortLeft) + viewPortRight;
	windowHeight = Math.abs(viewPortBottom) + viewPortTop;

	// post("- \n\n");
	// post("windowWidth: " + windowWidth + "\n");
	// post("windowHeight: " + windowHeight + "\n");
}

// This method scales mySketch and myGrid in order to fill the window as much as possible at any given aspect ratio
function scaleSketch(){
	// check height of aspect ratio si smaller than width (which is always 1)
	if(heightRatio < 1){
		// calculate the scaling factor
		var factor = screenResolution[0] / screenResolution[1];
		// scale mySketch
		mySketch.scale = [factor, factor, 1];
		// scale myGrid
		myGrid.scale = [withRatio * factor, heightRatio * factor, 1];
	} else {
		// otherwise just scale it of a factor of 1. This will fill the height of the window.
		mySketch.scale = [1, 1, 1];
		myGrid.scale = [withRatio, heightRatio, 1];
	}
}

function newGrid(i){
	// vertical subdivision is expressed in how many cells to display horizontaly, vertical count will be calculated accordingly
	subdivisions = i;

	// check if viewPort with if greater than height
	if(viewPortAspectRatio[0] >= viewPortAspectRatio[1]){
		// update increment
		increment = windowHeight / subdivisions;
	} else if(viewPortAspectRatio[0] < viewPortAspectRatio[1]){
		// update increment
		increment = windowWidth / subdivisions;
	}
	// calculate horizontal and vertical grid resolutions aka the number of cells in the grid 
	horizontalRes = windowWidth / increment;
	verticalRes = windowHeight / increment;
	// positions used to have many values. this current iteration doesn't make much sense but I left it to avoid updating other areas of the code and keep moving with the rest
	positions = [-increment, increment];
	// update myGrid dim to match the calculated grid
	myGrid.dim = [1 + horizontalRes, 1 + verticalRes];

	// post("- \n\n");
	// post("increment: " + increment + "\n");
}

// This method repositions and scales the progressbar according to the viewPort's size
function updateBrogressBarLocation(){
	progressBar.startPoint.x = viewPortLeft;
	progressBar.endPoint.x = viewPortRight;
	progressBar.startPoint.y = viewPortBottom;
	progressBar.endPoint.y = viewPortBottom;
}

// This method shows the bounds of the viewport for calibration and projector setup
function viewPort(){
	mySketch.glpushmatrix();
	// check if viewPort has been requested (1) or not (0)
	if(viewPortStatus == 1){
		// when visible the quads masking outer area are colored in transparent red
		mySketch.glcolor(1, 0.45, 0.47, 0.5);
		myRender.axes = 1;
		myGrid.poly_mode = 1;
		myGrid.point_size = 2;
		myGrid.line_width = 2;
	} else {
		// when hidden  the quads masking outer area are colored in solid black, thus creating a mask
		mySketch.glcolor(0, 0, 0, 1);
		myRender.axes = 0;
		myGrid.poly_mode = 2;
		myGrid.point_size = thisPointSize;		
	}
	// check if viewPort height is smaller than widht
	if(heightRatio < 1){
		// assign positions for green bounds to position them on left and right sides
		var x1 = viewPortRight;
		var y1 = viewPortTop;
		var x2 = viewPortRight;
		var y2 = viewPortTop + windowHeight * 10;
		var x3 = viewPortLeft;
		var y3 = viewPortTop + windowHeight * 10;
		var x4 = viewPortLeft;
		var y4 = viewPortTop;
		// position quads accordingly to create green bounds
		mySketch.quad(x1, y1, 0, x2, y2, 0, x3, y3, 0, x4, y4, 0);
		mySketch.quad(x1, -y1, 0, x2, -y2, 0, x3, -y3, 0, x4, -y4, 0);
	} else if(heightRatio >= 1){
		// assign positions for green bounds to position them on top and bottom
		var x1 = viewPortRight + windowWidth * 10;
		var y1 = viewPortTop;
		var x2 = viewPortRight + windowWidth * 10;
		var y2 = viewPortBottom;
		var x3 = viewPortRight;
		var y3 = viewPortBottom;
		var x4 = viewPortRight;
		var y4 = viewPortTop;
		// position quads accordingly to create green bounds
		mySketch.quad(x1, y1, 0, x2, y2, 0, x3, y3, 0, x4, y4, 0);
		mySketch.quad(-x1, y1, 0, -x2, y2, 0, -x3, y3, 0, -x4, y4, 0);
	}
	mySketch.glpopmatrix();
	mySketch.glflush();
}
