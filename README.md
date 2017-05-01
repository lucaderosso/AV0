![hero](https://github.com/lucaderosso/AV0/blob/master/images/hero.jpg)

# AV0

AV0 is an exploration on live human-computer collaboration in the field of audio visual, dedicated to anyone believing in computers as partners in the creative flow. 

##### About the develomplent

The project was started in September 2016 with the initial desire to make a piece to tour to venues. During its development however, I realized the project was introducing a new perspective on performing audio visuals, and that the device I was building could become an expandable framework on top of which one would build their own set.
My plan is to keep refining it, and my dream is to do this with anyone else wants to help.

##### About this documentation

This documentation provides a very high level overview of the code you'll find in this repository. It should be enough to provide an idea of what is goin on here and quickly offer anyone with Live the chance to try my work. Time is little, things to say are many, and I did an extreme selection of information to get you started. I'm sure there are plenty of important things I forgot to include, if so, the very first of you who will send some feedback will be fundamental in filing the rough edges of this material.

If you want to learn more about the concept behind AV0 you can do so [on my website](http://www.lucaderosso.com).


# Getting Started

This project was developed as a tool for myself and it therefore still lacks lots of the packaging that would make easy for someone to hit download and integrate it in their set.
To get you started as fast as possible I decided the best route was to share a Live Set already setup where you should be able to see what it does instead of reading a list of instructions.

1. __Download__ and launch this Live Set which comes with a pre set track including all you need to try it.
2. __Hit Play —__ visuals drawing firing is linked to live's transport. Activating Live's playback also tells the visuals to be drawn.
3. __Play —__ play notes (from E2 to G3) or launch the Demo clip to see visuals and hear sounds.

And that should be enough to get you hooked a little, hopefully.

__NOTE:__ if you don't hear sound but everything seems setup correctly on your end, try deleting AV0 device and the undo the action. This is the only workaround I found to a known but hard to replicate issue in MaxForLive where MIDI in/out sometimes gets blocked.

If this still doesn't work feel free to point that out here or DM me via [Facebook](https://www.facebook.com/derossoluca) if you like.



# About the live set

![overview](https://github.com/lucaderosso/AV0/blob/master/images/overview.jpg)

In this section I'll explain how the Live Set mentioned in the *Getting Started* section is setup. For starters the image above shows what you should see after launching it.<br> The focus of this section is on the *Demo Track's* detail view, which looks as following. Here you should see one big device called *AV0 Group* where I grouped together the following devices:



#### AV0

![Detail AV0](https://github.com/lucaderosso/AV0/blob/master/images/detail_av0.jpg)

this is the main device responsible for generating and controlling visuals and the piece's length. For more information on this device see the section *The AV0 Device.

#### Sounds

![Detail Sound](https://github.com/lucaderosso/AV0/blob/master/images/detail_sounds.jpg)

a drum rack with some sounds. This device plus the AV0 device are make the bare bones for connecting visuals to sounds. One thing to mention here is the presence of an operator

#### Effects

![Detail Effects](https://github.com/lucaderosso/AV0/blob/master/images/detail_effects.jpg)

currently AV0 has 3 simple effects, such as *Opacity*, *Decay* and *Audio Feed*. By themselves these effect have only an impact on the visuals, so combining them with audio effects help bringing the whole thing to life. That's why all these devices are grouped inside the *AV0 Group*, so Macro controlers can be used to controll both visuals' and audio's effects.

#### Levels

![Detail Levels](https://github.com/lucaderosso/AV0/blob/master/images/detail_levels.jpg)

this device touches a little explored concept of feeding filtered audio signal values into visuals using send and receive objects. All it does is letting the audio to pass through while grabbing signal's valuse to send to the AV0 device. The *Audio Feed* parameter on the AV0 device controls the amount of that value being passed to visuals.


#### Mind the BPM

![Tempo](https://github.com/lucaderosso/AV0/blob/master/images/tempo.jpg)

Before telling more about the devices in the set I'd like to point your attention on the BPM set at 220bpm. There are reasons based on my personal style I won't get into. But you should know that the lower the tempo the slower the visuals will be updated. At 4/4 tempo, 220bpm means that each beat is fired at a spead slighlty higher than 1/64th of a second. The AV0 device uses half of that speed with a metro set on 32n. So in short if you want to use this device at slower tempos you would have to change that metro value inside the timer.maxpat file.


# The AV0 Device

![Detail AV0](https://github.com/lucaderosso/AV0/blob/master/images/detail_av0.jpg)

As you probalby noticed the AV0 device's UI is divided in several areas. I'll proceed explaining what each of this area does, from left to right.

__1 • Made JS edits?__

![Compiler](https://github.com/lucaderosso/AV0/blob/master/images/dev_01.jpg)

This function allows you to recompile the JS code in case you made some changes. The file *main.js*, which has autowatch property set to 1 shouldn't need this action, but any change to all other files requires to compile the JS.

__2 • Input Inspector__

![Input Inspector](https://github.com/lucaderosso/AV0/blob/master/images/dev_02.jpg)

MAPPING MAPPING MAPPING MAPPING MAPPING PADSSSSSSSSSAH!!
Used for tesigng and debugging. At a surface level this section's purpose is to show what pad is being pressed and with which velocity.

__3 • Output Setup__

![Output Setup](https://github.com/lucaderosso/AV0/blob/master/images/dev_03.jpg)

This is where you indicate the Output resolution of the screen or projector you are using, and the viewport aspect ratio you desire to cut out for your visuals. To see the viewport mask hit *V key* while either the window or the AV0 device are on focus and playback is on.

__4 • Window__

![Window](https://github.com/lucaderosso/AV0/blob/master/images/dev_04.jpg)

This allows to set some of the window's properties. Useful when you're reharsaling and don't need or want to connect a second screen or you're preparing audio material and want to hide the visuals.

__5 • Controls__

![Controls](https://github.com/lucaderosso/AV0/blob/master/images/dev_05.jpg)

This area is highly unexplored. Current available effects are *Opacity*, which sets element's transarency, *Audio Feed* which enables audio signal to impact on the grid's color intensity, *Decay* which sets the ease and lifespan of elements (0: snappy moves and sudden fade, 127: slow moves and long fading). All other controls are hooked up in Max and in the JS but they currently do nothing.

__6 • Timer__

![Timer](https://github.com/lucaderosso/AV0/blob/master/images/dev_06.jpg)

This is the part that enables the fun and upredictable collaboration bethween human andcomputer. When activated, the AV0 device will link the countdown represented by the progress bar ad teh bottom of the window, to the live set and the visuals. Once the time is up, Timer will stop all playing sounds, it will generate a new sets of visuals and block incoming MIDI messages for 3 seconds.

# Files in this repo
Simply a list of all the files you'll find in this repository, and a brief description on what they do. Please note: give its very alpha stage most if not all of the following files might look like they are offering functionalities that are not used or some method might look as designed to be apparently uselessly scalable. The hope of course is to fullly elaborate all of them soon.

#### MaxForLive Files

* __AV0.amxd —__ This is the main MaxForLive device.
* __Layout Debugger.amxd —__ This device is used to test out new elements and how they behave in different layouts.
* __Levels.amxd —__ This device sends levels values via a send object that are then received by AV0 to affect elements and such. It's not a clean solution but though.

#### MaxMSP Files

* __call-scene.maxpat —__ This file is responsible to stopping all sounds, blocking temporairily the user input and calling a new scene by banging *setup-scene.maxpat*. It's used every time the timer reaches the end, when enabled.
* __method-selector.maxpat —__ This file is responsible for assigning an action to each MIDI note. To see how MIDI notes are mapped please see the Mapping section.
* __setup-scene.maxpat —__ This file is responsible for creating a new scene. Sets the grid's subdivision, decides how many elements to add to each layer, what tipe and size. A lot od randomness goes on here, one day I hope it'll be more intelligent.
* __sustain-check.maxpat —__ This file is responsible to tell the js methods wether at least one note in a row is still pressed or not. To learn what I mean by rows please see the Mapping section.
* __timer.maxpat —__ This file bangs the js object and controls the countdown based on Live global transport.
* __titles.maxpat —__ This file is responsible for showing titles every time a new scene is created.

#### Text Files

* __types.txt —__ This file is a list of names referring to elements that can be created. It's loaded and by _setup-scene.maxpat_ to select random elements from it and then generate them via the relative method inside _characters.js_ file. 
* __actions.txt —__ This file is a list of actions elements can do when there is incoming MIDI messages. It's used by _method-selector.maxpat_ which, at the creation of every new scene, will pick a random action variation for each note. At the current stage of AV0 this approach is not necessary given to the limited set of available actions developed so far.

#### Javscript Files

* __main.js —__ This is the main js which is primarili responsible for listening to user's input and drawing on the window.
* __elements.js —__ This is where elements are defined, generated, organized on the grid and where actions are defined. Among all things I whis it was solved better, this is one of the areas I believe needs the greater improvements to make this device flexible enought to be able to generate elements and animate them.
* __utilities.js —__ This is where basic setup and other utilities are.



#### Secret keys

* __Press V:__ to see the viewport within which visuals are projected. Useful when going fullscreen on unusual aspect ratios and need to calibrate the projector.
* __Press T:__ to see again titles after they disappear. Pressing notes again will make them fade away.












