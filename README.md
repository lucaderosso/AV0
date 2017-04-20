# AV0 - No Intelligence

An exploration on human-computer collaboration in the field of audio visual, dedicated to anyone believing in computers as partners in the creative flow.



## About this project

AV0 is an audio visual project I started in September 2016 with the initial desire to make a personal piece to tour to venues. During its development however I realize I was giving introducing a perspective on performing audio visuals, and building something that was closer to an expandable framework rather than a set piece.

If you want to learn more about the concept behind AV0 you can do so on my website here.



## About this documentation

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
Simply a list of all the files you'll find in this repository, and a brief description on what they do. Please note: give its very alpha stage most if not all of the following files might look like they are offering functionalities that are not used or some method might look as designed to be apparently uselessly scalable. The hope of course is to fullly elaborate all of them soon.

#### MaxForLive file

* __AV0.amxd —__ This is the main MaxForLive device.

#### Max/MSP files

* __call-scene.maxpat —__ This file is responsible to stopping all sounds, blocking user input and calling a new scene. It's used every time the timer reaches the end, if this last one is enabled.
* __method-selector.maxpat —__ This file is responsible for assigning an action to each MIDI note. To see how MIDI notes are mapped please see the Mapping section.
* __setup-scene.maxpat —__ This file is responsible for creating a new scene. Sets the grid's subdivision, decides how many elements to add to each layer, what tipe and size. A lot od randomness goes on here, one day I hope it'll be more intelligent.
* __sustain-check.maxpat —__ This file is responsible to tell the js methods wether at least one note in a row is still pressed or not. To learn what I mean by rows please see the Mapping section.
* __timer.maxpat —__ This file bangs the js object and controls the countdown based on Live global transport.
* __titles.maxpat —__ This file is responsible for showing titles every time a new scene is created.

#### Text files

* __types.txt —__ This file is a list of names referring to elements that can be created. It's loaded and by _setup-scene.maxpat_ to select random elements from it and then generate them via the relative method inside _characters.js_ file. 
* __actions.txt —__ This file is a list of actions elements can do when there is incoming MIDI messages. It's used by _method-selector.maxpat_ which, at the creation of every new scene, will pick a random action variation for each note. At the current stage of AV0 this approach is not necessary given to the limited set of available actions developed so far.

#### Javscript files

* __main.js —__ This is the main file.
* __utilities.js —__ This is the main file.
* __characters.js —__ This is the main file.

#### Tools folder

* __Layout Debugger.amxd —__ This is the main file.
* __Levels.amxd —__ This is the main file.



#### Mapping

Images and mapping explanation.



#### Secret keys

__Press V:__ to see the viewport within which visuals are projected. Useful when going fullscreen on unusual aspect ratios and need to calibrate the projector.
__Press T:__ to see again titles after they disappear. Pressing notes again will make them fade away.












