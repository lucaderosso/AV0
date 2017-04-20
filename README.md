# VERY VERY VERY WORK IN PROGRESS

## AV0 - No Intelligence

What

#### What you find here and what they do in short

##### MaxForLive file

* AV0.amxd

##### Max/MSP files

* ###### call-scene.maxpat
* ###### method-selector.maxpat
* ###### setup-scene.maxpat
* ###### sustain-check.maxpat
* ###### timer.maxpat
* ###### titles.maxpat

##### Text files

* ###### types.txt
* ###### actions.txt

##### Javscript files

* ###### main.js
* ###### utilities.js
* ###### characters.js



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