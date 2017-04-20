// Luca De Rosso
// http://www.lucaderosso.com/

// Instagram: @lucaderosso
// Twitter: @lucaderosso
// Facebook: facebook.com/derossoluca
// Pinterest: pinterest.com/lucaderosso
// Github:

// Things you will forget
// 1.0 — always first check the array of shape is not empty otherwise it will give an error. remember every time a new scen starts the array is emptied and quickly populated again with the elements necessary for the current scene



// ———————
// GENERAL
// ———————

autowatch = 1; // so the [js] object in max wil recompile the code each time is saved 
outlets = 2; // number of outlets for the [js] object

include("utilities");
include("characters");

var layer1 = new Layer();
var layer2 = new Layer();
var layer3 = new Layer();
var layer4 = new Layer();

var layers = [layer1, layer2, layer3, layer4];

var colorBlack = Object.create(Color);
colorBlack.r = 0;
colorBlack.g = 0;
colorBlack.b = 0;
colorBlack.a = 1;

var colorWhite = Object.create(Color);
colorWhite.r = 1;
colorWhite.g = 1;
colorWhite.b = 1;
colorWhite.b = 1;

var dial0 = 0;	
var dial1 = 0;
var dial2 = 0;
var dial3 = 0;
var dial4 = 0;
var dial5 = 0;
var dial6 = 0;
var dial7 = 0;

// low mid high levels coming from the DSP Values M4L device in the same track as this one.
var low = 0;
var mid = 0;
var high = 0;

var progressBar = new Line(viewPortLeft, viewPortBottom, viewPortRight, viewPortBottom);



// –––––
// SETUP
// —————

calculateSizesForViewPort();
scaleSketch();
viewPort();
newGrid(8); // build a grid that draw() will display



// ———————————–––––––––––––––––––––––––––––––––––––––––––––
// USER INPUTS: Methods listening to  MIDI inputs from Live
// ———————————————————————————————————————————–––––––––––––

// dials
function dialValue(dial, value){	
	switch (dial){
		case "d0":
			dial0 = value;
			assignLifeSpan(value);
		break;
		case "d1":
			dial1 = value;
		break;
		case "d2":
			dial2 = value;
		break;
		case "d3":
			dial3 = value;
		break;
		case "d4":
			dial4 = value;
		break;
		case "d5":
			dial5 = value;
		break;
		case "d6":
			dial6 = value;
			updateLifeDecay(value);			
			assignEase(value);
			background(value);
		break;
		case "d7":
			dial7 = value;
		break;
		default:
	}
}

// pads: sustain control to maintain elements on screen for as long as pad is pressed
function checkSustain(layer, velocity){
	updateSustainForLayer(layer, velocity);
	// go get the right array for the layer I want to interact with
	var array = getArrayForLayer(layer);	
	// do the following only if the array is populated
	if(array.length > 0){
		// go through each element in the array
		for(var i = 0; i < array.length; i++){
			if(velocity > 0){
				array[i].lifespan = newLifeSpan; // recover lifespan
				array[i].fading = false; // don't fade as long as pad is pressed 
			} else {
				// if velocity is == 0 (aka pad no longer pressed) then start fading the element
				array[i].fading = true;
			}
		}
	}
}

// pads: interaction with layers
function callAction(family, type, layer, velocity){
	// create action name concatenating family and type
	var action = family.concat(type);
	switch (action){
		case "resetAll":
			newLocationTarget(layer, velocity, true, "reset");
			// newSizeTarget(layer, velocity, true, "reset");
		break;
		case "translateBoth":
			newLocationTarget(layer, velocity, true, "roam");
		break;
		// case "translateVertical":
		// 	newLocationTarget(layer, velocity, true, "vertical");
		// break;
		// case "translateHorizontal":
		// 	newLocationTarget(layer, velocity, true, "horizontal");
		// break;
		case "rotateRandom":
			newRotationTarget(layer, velocity, true);
		break;
		case "scaleBoth":
			// newSizeTarget(layer, velocity, true, "scale");
			newScaleTarget(layer, velocity, true, "random");

		break;
	}
}

function updateSustainForLayer(layer, velocity){	
	// this method updates a boolean value I can then use to decide
	// wether or not sending drawing instruction for a specific layer
	// to mySketch. That is because when shapse are not visible, 
	// lifespan (aka opacity) is set to 0, but elements are still drawn.
	// In this way when a note's velocity is > 0, drawing commands are
	// sent to mySketch and elements are drawn, else drawing commands are 
	// blocked saving cpu when elements don't need to be shown
	var sustainStatus = velocity > 0 ? true : false;
	
	switch (layer){
		case "layer1":
			layer1.sustain = sustainStatus;
		break;
		case "layer2":
			layer2.sustain = sustainStatus;
		break;
		case "layer3":
			layer3.sustain = sustainStatus;
		break;
		case "layer4":
			layer4.sustain = sustainStatus;
		break;
		default:
	}
}



//==================
//		Methods
//==================

// not used
// function transport(l, m, h){
// 	// update values for low mid high levels coming from the DSP Values M4L device in the same track as this one.
// 	low = l;
// 	mid = m;
// 	high = h;
// }

function levels(l, m, h){
	// update values for low mid high levels coming from the DSP Values M4L device in the same track as this one.
	low = l;
	mid = m;
	high = h;
}

var whiteOnBlack = true;
// this method is not currently used but I implemented for future use
// all it does is inverting colors, black becomes white and vice versa
// I thouught it could be a fun effect to trigger every now and then or 
// to let the patch to control independently. Right now it's just a draft
// as I'm sure there is an easier way to implement this functionality.
function invertColors(invert){	
	if (invert == 0) {
		whiteOnBlack = true;
		// back to black
		colorBlack.r = 0;
		colorBlack.g = 0;
		colorBlack.b = 0;
		// back to white
		colorWhite.r = 1;
		colorWhite.g = 1;
		colorWhite.b = 1;
		// black background
		myRender.erase_color = [0, 0, 0, 1];
		// white grid
		myGrid.gl_color = [0.1, 0.1, 0.1, 1];
	} else if (invert == 1){
		whiteOnBlack = false;
		// black into white
		colorBlack.r = 1;
		colorBlack.g = 1;
		colorBlack.b = 1;
		// white into black
		colorWhite.r = 0;
		colorWhite.g = 0;
		colorWhite.b = 0;
		// white background background
		myRender.erase_color = [1, 1, 1, 1];
		// black grid
		myGrid.gl_color = [0.9, 0.9, 0.9, 1];
	}
}

// gridIntensity makes the grid's color reactive to audio signal
function gridIntensity(){
	if(whiteOnBlack == true){
		// adding 0.1 so it never goes to 0
		var value = 0.1 + (high * dial1);
		// assigning value to R, G and B to make it go from black to white
		myGrid.gl_color = [value, value, value, 1];
	} else {
		var value = 0.9 - (high * dial1);
		myGrid.gl_color = [value, value, value, 1];
	}
}

function background(value){
	if(whiteOnBlack == true){
		myRender.erase_color = [0, 0, 0, 1 - (value - 0.01)];
	} else {
		myRender.erase_color = [1, 1, 1, 1 - (value - 0.01)];
	}
}

function updateProgressBar(timeLeft, totalTime){
	progressBar.endPoint.x = (windowWidth * (timeLeft / totalTime)) - viewPortRight;
}




//==================
//		Draw
//==================

function draw(){	

	// check if Layer has to be drawn
	if(layer1.toDraw()){
		// draw all elements  in layer
		for(var i = 0; i < layer1.elements.length; i++){
			layer1.elements[i].run();
		}
	}

	if(layer2.toDraw()){
		for(var i = 0; i < layer2.elements.length; i++){
			layer2.elements[i].run();
		}
	}

	if(layer3.toDraw()){
		for(var i = 0; i < layer3.elements.length; i++){
			layer3.elements[i].run();
		}
	}

	if(layer4.toDraw()){
		for(var i = 0; i < layer4.elements.length; i++){
			layer4.elements[i].run();
		}
	}

	outlet(0, "jit_matrix", myRender.name); 
	outlet(1, "jit_matrix", myMatrix.name);

	progressBar.run();
	gridIntensity();
	viewPort();

	myRender.erase();
	myRender.drawswap();

	// reset the sketch at every frame to avoid to overload the command list 
	// that's because the sketch object will keep accumulating all the commands at each cycle	
	mySketch.reset();
}
