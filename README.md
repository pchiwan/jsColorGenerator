jsColorGenerator
================

A JavaScript color generator.

# Introduction
When trying to build cool, modern, beautiful websites there's a pretty high chance you'll be using different colors to do so. And, if you're loading content dynamically, chances are even higher that you'll be needing LOTS of different colors. You may spend hours defining a large set of your favourite, gorgeous Pantones. Or -if you're not too picky with what may come out- you can generate random colors on the fly. How, you ask? Well, you'll find hundreds of solutions on the internet, and this is just another one.


# The tool


## Options

### __useBackpack__
The `jsColorGenerator` carries a "backpack" where it keeps the collection of already generated colors. True by default.

### __useStaticBackpack__
Use a static collection of predefined color. False by default.

### __avoidDarks__
Avoid the darkest colors (as much as possible). False by default.

### __avoidLights__
Avoid the lightest colors (as much as possible). False by default.

### __source__
A string containing the set of hexadecimal symbols that will be used as the source palette to generate colors. The range of these symbols is 0-9 and A-F. If you still don't know what I'm talking about head [here](http://en.wikipedia.org/wiki/Web_colors) and read it, 'cause I ain't gonna explain it. The default value is '0123456789ABCDEF' (the whole range).

# Methods

### __getBackpack__
Returns a copy of the backpack. 

### __getColor__
If a 'key' is provided and the backpack contains a color with such given 'key', that color is returned. If there is no color with that 'key' in the backpack, or no 'key' is provided at all, a new color is generated and automatically stored in the backpack (when no 'key' is provided the new color is stored using the color's value as the key). 
        
### __getAllColors__
Generates and returns ALL the possible colors given the current source palette. Actually the amount of resulting colors is limited to 1000 for performance reasons.

### __reset__
Resets the color backpack.


# Properties

### __options__

### __staticBackpack__
        

# Demo
You can play with my example jsfiddle [here](http://jsfiddle.net/pchiwan/3YdAd/).