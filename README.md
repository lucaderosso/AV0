# AV0 - No Intelligence

An exploration on human-computer collaboration in the field of audio visual, dedicated to anyone believing in computers as partners in the creative flow.


## About

AV0 is an audio visual project I started in September 2016 with the initial desire to make a personal piece to tour to venues. During its development however I realize I was giving introducing a perspective on performing audio visuals, and building something that was closer to an expandable framework rather than a set piece.

If you want to learn more about the concept behind AV0 you can do so on my website here.


## Files
Simply a list of all the files you'll find in this repository, and a brief description on what they do

### MaxForLive file

* __AV0.amxd —__ This is the main file.

### Max/MSP files

* __call-scene.maxpat —__ This is the main file.
* __method-selector.maxpat —__ This is the main file.
* __setup-scene.maxpat —__ This is the main file.
* __sustain-check.maxpat —__ This is the main file.
* __timer.maxpat —__ This is the main file.
* __titles.maxpat —__ This is the main file.

### Text files

* __types.txt —__ This is the main file.
* __actions.txt —__ This is the main file.

### Javscript files

* __main.js —__ This is the main file.
* __utilities.js —__ This is the main file.
* __characters.js —__ This is the main file.

### Tools folder

* __Layout Debugger.amxd —__ This is the main file.
* __Levels.amxd —__ This is the main file.

















### Laws:

1. Each layer has a different object type

    `Each layer should be populated with a different object type`

2. Number of obects follows a geometric series

    `The quantity of characters is defined by the series where each term after the first is twice the previous term e.g.: 1, 2, 4, 8, 16...`

3. The window has a scale defined

	`The window is divided in a checked grid which resolution is designated using the series in law 2.`

4. Objecst move according to the scale

	`Objects move with increments defined dividing the window's size by the designated resolution.`

5. Obejcs are arranged on a grid system 

	`Objects are arranged in space based on a generative grid system in which the number rows and colums is defined using the series in law 2.`

6. Obejcs move withing the bounds defined by the grid called roaming areas

	`An object placed in the top left cell of a 2 by 2 grid will move solely inside that and never invade other spaces in that layer.`

7. The size of each object is a fraction of the checked grid increment

	`Eg: increment = 0.25, size = 0.5, then size = 0.25 * 0.5 = 0.125. Multiples are 1 1/2 1/4 1/8 1/16 1/32`