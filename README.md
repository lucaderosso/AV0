![hero](https://github.com/lucaderosso/AV0/blob/master/images/hero.jpg)

# AV0

AV0 is an exploration on live human-computer collaboration in the field of audio visual, dedicated to anyone believing in computers as partners in the creative flow. 

The project was started in September 2016 with the initial desire to make a piece to tour to venues. During its development however, I realized I was introducing a new perspective on performing audio visuals, and that the device I was building could become an expandable framework on top of which one would build their own set.
My plan is to keep building it, and my dream is to do this with anyone else wants to help.

##### About this documentation

This documentation provides a quick access to trying AV0 and a high level view of the code you'll find in this repository. I'm sure there are plenty of important things I forgot to include, so please send your feedback and questions. You can do so by:

* Creating an issue on this repo
* Emailing me ay hellotoluca [at] gmail [dot] com
* DM me via [Facebook](https://www.facebook.com/derossoluca)

If you whish to learn more about the concept behind AV0 you can do so [on my website](http://www.lucaderosso.com).
<br>
<br>
<br>
# Getting Started

This project was developed as a tool for myself and it therefore still lacks the proper packaging that would make it immediate to integrate it in your set.
So in order to get you started as fast as possible I decided the best route was to share a Live Set already setup where you should be able to see what it does instead of reading a list of instructions.

1. __Download__ and launch [this Live Set template](http://www.lucaderosso.com/r/r_av0-live-template.html) which included all you need to try it.
2. __Activate Live's playback__ which will tells the visuals's window to starts drawing.
3. __Play notes__ (from E2 to G3) or launch the Demo clip to see visuals and hear sounds.

And that should be enough to get you hooked a little, hopefully.

__NOTE:__ if you don't hear sound but everything seems setup correctly on your end, try deleting AV0 device from the track and the undo the action. This is the only workaround I found to a known but hard to replicate issue in MaxForLive where MIDI In/Out sometimes gets blocked.
<br>
<br>
<br>
# About the Live Set

![overview](https://github.com/lucaderosso/AV0/blob/master/images/overview.jpg)

In this section I'll go over the setup of the Live Set mentioned in the *Getting Started* section. The image above shows what you should see after launching it. That includes the a Live Set with one track called *Demo Track* and the visual's window called *video-window*. In the *Demo Track's* detail view, you should see one big device called *AV0 Group* where I grouped together the following devices.
<br>
<br>
#### AV0

![Detail AV0](https://github.com/lucaderosso/AV0/blob/master/images/detail_001.jpg)

this is the main device responsible for generating and controlling visuals. For more information on this device see the section below called *The AV0 Device*.
<br>
<br>
#### Sounds

![Detail Sound](https://github.com/lucaderosso/AV0/blob/master/images/detail_002.jpg)

This is just a drum rack with some sounds. This device plus the AV0 device make the bare bones for connecting visuals to sounds. One thing to mention here is the presence of an operator
<br>
<br>
#### Effects

![Detail Effects](https://github.com/lucaderosso/AV0/blob/master/images/detail_003.jpg)

currently AV0 has 3 simple effects, such as *Opacity*, *Decay* and *Audio Feed*. By themselves these effect have only an impact on the visuals, so combining them with audio effects help bringing the whole thing to life. That's why all these devices are grouped inside the *AV0 Group*, so Macro controlers can be used to controll both visuals' and audio's effects.
<br>
<br>
#### Levels

![Detail Levels](https://github.com/lucaderosso/AV0/blob/master/images/detail_004.jpg)

this device touches a little explored concept of feeding filtered audio signal values into visuals using send and receive objects. All it does is letting the audio to pass through while grabbing signal's valuse to send to the AV0 device. The *Audio Feed* parameter on the AV0 device controls the amount of that value being passed to visuals.
<br>
<br>
#### Mind the BPM

![Tempo](https://github.com/lucaderosso/AV0/blob/master/images/tempo.jpg)

Before telling more about the devices in the set I'd like to point your attention on the BPM set at 220bpm. There are reasons based on my personal style I won't get into. But you should know that the lower the tempo the slower the visuals will be updated. At 4/4 tempo, 220bpm means that each beat is fired at a spead slighlty higher than 1/64th of a second. The AV0 device uses half of that speed with a metro set on 32n. So in short if you want to use this device at slower tempos you would have to change that metro value inside the timer.maxpat file.
<br>
<br>
<br>
# The AV0 Device

![Detail AV0](https://github.com/lucaderosso/AV0/blob/master/images/detail_av0.jpg)

As you probalby noticed the AV0 device's UI is divided in several areas. I'll proceed explaining what each of this area does, from left to right.
<br>
<br>
__1 • Made JS edits?__

![Compiler](https://github.com/lucaderosso/AV0/blob/master/images/dev_001.jpg)

This function allows you to recompile the JS code in case you made some changes. The file *main.js*, which has autowatch property set to 1 shouldn't need this action, but any change to all other files requires to compile the JS.
<br>
<br>
__2 • Input Inspector__

![Input Inspector](https://github.com/lucaderosso/AV0/blob/master/images/dev_002.jpg)

MAPPING MAPPING MAPPING MAPPING MAPPING PADSSSSSSSSSAH!!
Used for tesigng and debugging. At a surface level this section's purpose is to show what pad is being pressed and with which velocity.
<br>
<br>
__3 • Output Setup__

![Output Setup](https://github.com/lucaderosso/AV0/blob/master/images/dev_003.jpg)

This is where you indicate the Output resolution of the screen or projector you are using, and the viewport aspect ratio you desire to cut out for your visuals. To see the viewport mask hit *V key* while either the window or the AV0 device are on focus and playback is on.
<br>
<br>
__4 • Window__

![Window](https://github.com/lucaderosso/AV0/blob/master/images/dev_004.jpg)

This allows to set some of the window's properties. Useful when you're reharsaling and don't need or want to connect a second screen or you're preparing audio material and want to hide the visuals.
<br>
<br>
__5 • Controls__

![Controls](https://github.com/lucaderosso/AV0/blob/master/images/dev_005.jpg)

This area is highly unexplored. Current available effects are *Opacity*, which sets element's transarency, *Audio Feed* which enables audio signal to impact on the grid's color intensity, *Decay* which sets the ease and lifespan of elements (0: snappy moves and sudden fade, 127: slow moves and long fading). All other controls are hooked up in Max and in the JS but they currently do nothing.
<br>
<br>
__6 • Timer__

![Timer](https://github.com/lucaderosso/AV0/blob/master/images/dev_006.jpg)

This is the part that enables the fun and upredictable collaboration bethween human andcomputer. When activated, the AV0 device will link the countdown represented by the progress bar ad teh bottom of the window, to the live set and the visuals. Once the time is up, Timer will stop all playing sounds, it will generate a new sets of visuals and block incoming MIDI messages for 3 seconds. This will most likely leave you in your underwear on the stage, hence the icon.
<br>
<br>
<br>
# Grids and Layers
Visuals are arranged based on a simple grid system of rows and columns, as one would do in approaching a graphic design. The viewport where visuals are displayed is divided in a number of columns and rows. Each cell generated by this subdivision can allocate one visual element. 

![Grids](https://github.com/lucaderosso/AV0/blob/master/images/grid_000.png)
<br>
<br>
The cell defines  where the element will be positioned, its maximum size and the roaming areas at its disposal.
<br>
<br>
![Cells](https://github.com/lucaderosso/AV0/blob/master/images/grid_001.png)
<br>
<br>
There is a total of four layers each of which has a different grid subdivision and can therefore host different types of visuals, quantity and size.
<br>
<br>
![Layers](https://github.com/lucaderosso/AV0/blob/master/images/grid_002.png)
<br>
<br>
<br>
# Files in This Repo
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

<br>
<br>
<br>

# Secret keys

* __Press V:__ to see the viewport within which visuals are projected. Useful when going fullscreen on unusual aspect ratios and need to calibrate the projector.
* __Press T:__ to see again titles after they disappear. Pressing notes again will make them fade away.


