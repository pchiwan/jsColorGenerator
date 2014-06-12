jsColorGenerator
================

A JavaScript color generator.

# Introduction
When trying to build cool, modern, beautiful websites there's a pretty high chance you'll be using different colors to do so. And, if you're loading content dynamically, chances are even higher that you'll be needing LOTS of different colors. You may spend hours defining a large set of your favourite, gorgeous Pantones. Or -if you're not too picky with what may come out- you can generate random colors on the fly. How, you ask? Well, you'll find hundreds of solutions on the internet, and this is just another one.


# What do I offer?
"Ok, so there are hundreds of other solutions on the internet, you said. What does your solution offer then?". My `jsColorGenerator` can be configured to generate random colors in a specific range of tones (light, dark, or any), but the most interesting feature -IMO- is the use of what I have called the "backpack". The `jsColorGenerator` carries a backpack where it keeps the collection of already generated colors, thus ensuring that those will not be generated again. Also, every generated color is paired with a key when stored, so that you may retrieve a previously generated color at any time.

To randomly generate colors I use a source palette defined by a string containing a set of hexadecimal symbols. The range of these symbols is 0-9 and A-F, i.e.: '6789AB' (if you still don't know what I'm talking about head [here](http://en.wikipedia.org/wiki/Web_colors) and read it, 'cause I ain't gonna explain it). The total number of possible combinations (different colors) is determined by the source and the formula `Math.pow(n, r)`, where `n` is the number of digits in the source, and `r` is the number of digits that each possible combination must have -which, for hexadecimal representation of colors, is 6-. Therefore, for the example source '6789AB' there are `Math.pow(6, 6) = 46656` possible combinations. Is that enough for you?

Keep in mind though that, regardless of playing with randomness, there aren't that many __significantly different__ colors in a source's range: when two color codes differ slightly they will look almost exactly the same. Therefore it's perfectly possible -and will likely happen- that the `jsColorGenerator` provides you with colors which seem to be repeated though they're actually not. That's why I'm currently planning on implementing an important improvement to ensure that randomly generated colors are significantly different -or different enough- to one another.

NOTE: This tool is still a toddler; I know it may be flawed and that it can be highly improved. Your ideas, suggestions, and contributions are extremely welcome. 

In order to use the `jsColorGenerator` you must instantiate it like this.

```javascript
var colGen = new jsColorGenerator();
```

You may configure your instance by providing a set of the following options.

## Options

### __useBackpack__
The `jsColorGenerator` carries a "backpack" where it keeps the collection of already generated colors. Using the backpack ensures that previously generated colors will not come out again. True by default.

### __useStaticBackpack__
The static backpack is a collection of predefined colors. If you're not bold enough and dread the risks of random color generation you can use the static backpack instead. This way, the `jsColorGenerator` will still keep track of which colors have already been provided, ensuring they are not repeated. You may provide your own static backpack. False by default.

### __avoidDarks__
Avoid the darkest colors (as much as possible). False by default.

### __avoidLights__
Avoid the lightest colors (as much as possible). False by default.

### __source__
A string containing the set of hexadecimal symbols that will be used as the source palette to generate colors. The default value is '0123456789ABCDEF' (the whole range). I.e.:

```javascript
var colGen = new jsColorGenerator({
	source: '6789AB'	
});
```

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
The options currently in use by the `jsColorGenerator`, so you can access and modify them at any time.

### __staticBackpack__
You can provide and modify your own collection of predefined colors at any time.
        

# Demo
You can play with my example jsfiddle [here](http://jsfiddle.net/pchiwan/3YdAd/).