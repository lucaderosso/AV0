# AV0 - No Intelligence

An exploration on human-computer collaboration in the field of audio visual, dedicated to anyone believing in computers as partners in the creative flow.



## About the project

AV0 is an audio visual project I started in September 2016 with the initial desire to make a personal piece to tour to venues. During its development however I realize I was giving introducing a perspective on performing audio visuals, and building something that was closer to an expandable framework rather than a set piece.

If you want to learn more about the concept behind AV0 you can do so on my website here.



## About the documentation

This documentation is bad. But in these fast paced times we live in, I decided it was more important to give anyone who comes across the project the chance to put their hands on it and eventually yell at me for the poor documentation, poor code and overall alpha stage. Time is little, things to say are many, and I did an extreme selection of information to get you started.
I really hope what you'll read on this page can give you the chance to try the project, and please if you find any difficulties let me know and I'll do what I can to help.  



## Getting Started
As I mentioned above this project was intented to be a tool for myself, and while I see in it a potential for others to contribute to expanding it. I should warn you that this is very, very alpha.
I wish I could give you step by step instructions but I believe the best I can do at this point is to share a Live file already setup you where you can see some things by yourself instead of reading and infinite list of instructions. So the following instructions are for the file I mentioned:

1. __Download__ the Live file that comes with a pre set track including all you need to just play.
2. __Hit Play —__ visuals are linked to live's transport, so playback needs to be active.
3. __Play —__ launch a clip to see visuals reacting to MIDI notes.

And that should be enought to get you hooked a little, hopefully. 



## Files
Simply a list of all the files you'll find in this repository, and a brief description on what they do

#### MaxForLive file

* __AV0.amxd —__ This is the main file.

#### Max/MSP files

* __call-scene.maxpat —__ This is the main file.
* __method-selector.maxpat —__ This is the main file.
* __setup-scene.maxpat —__ This is the main file.
* __sustain-check.maxpat —__ This is the main file.
* __timer.maxpat —__ This is the main file.
* __titles.maxpat —__ This is the main file.

#### Text files

* __types.txt —__ This is the main file.
* __actions.txt —__ This is the main file.

#### Javscript files

* __main.js —__ This is the main file.
* __utilities.js —__ This is the main file.
* __characters.js —__ This is the main file.

#### Tools folder

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