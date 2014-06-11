/********************
 * JS Color generator
 * by Sílvia Mur Blanch aka PchiwaN
 * https://github.com/pchiwan/jsColorGenerator
 *
 * NOTE: jQuery and a real browser are required (so no IE below 9, please)
 ********************/

function jsColorGenerator (options) {
    /// <summary>
    /// Instantiates a ColorGenerator object.
    /// </summary>
    /// <param name="options" type="Object">
    /// <para> ---------------------------------------------- </para>
    /// <para> useBackpack:Boolean -> Keep a collection of already generated colors. True by default. </para>
    /// <para> ---------------------------------------------- </para>
    /// <para> useStaticBackpack:Boolean -> Use a static collection of predefined color. False by default. </para>
    /// <para> ---------------------------------------------- </para>
    /// <para> avoidDarks:Boolean -> Avoid dark colors. False by default. </para>
    /// <para> ---------------------------------------------- </para>
    /// <para> avoidLights:Boolean -> Avoid light colors. False by default. </para>
    /// <para> ---------------------------------------------- </para>
    /// <para> source:String -> String containing the set of characters that should be used to generate colors. </para>
    /// <para> ---------------------------------------------- </para>
    /// </param>
    /// <returns type="Object">A ColorGenerator object instance.</returns>

    var self = this;

    var defaultOptions = {
        useBackpack: true,
        useStaticBackpack: false,
        avoidDarks: false,
        avoidLights: false,
        source: '0123456789ABCDEF'
    };

    //timer defaults
    options = $.extend({}, defaultOptions, options);

    var palette = options.source.split('');        
    var trunk = [];
    var backpack = [];
    var staticBackpack = [
        '60AA17',
        'EFC82B',
        '2777EC',
        'D9532C',
        '009EAF',
        'F473D0',
        'F1A30B',
        'BA1D47',        
        'F3822F',
        'A451B2',
        'D90073',
        'A4C400',
        '765F89',
        'E51400',
        '7B3A3E',
        '657688',
        '0A58C1',
        '835A2C',
        '1C767F',
        'FA6801',
        '4C6536',
        '42AAFA',
        '7DB37B',
        'A88EC6',
        '42544C',
        '6557E6',
        '788FC5',
        'CD3D66',
    ];
    var staticIndex = 0;
    var limit = options.useStaticBackpack ? staticBackpack.length : calculateMaxCombinations(palette.length, 6);    

    //#region Private methods

    function contains (array, item) {
    	/// <summary>Inspired by underscore.js: returns true if the item is present in the array</summary>

    	return array.indexOf(item) >= 0;
    }

    function pluck (array, key) {
    	/// <summary>Inspired by underscore.js: extracting a list of property values</summary>

    	var results = [];
    	for (var i = 0, l = array.length; i < l; i++) {
    		if (array[i][key]) {
    			results.push(array[i][key]);
    		}
    	}
    	return results;
    }

    function find (array, iterator) {
    	/// <summary>
    	///	Inspired by underscore.js: Looks through each item in the list, returning the first one that passes a truth test (predicate), 
    	/// or undefined if no value passes the test
    	/// </summary>

    	var item;
    	for (var i = 0, l = array.length; i < l; i++) {
    		if (iterator.call(this, array[i])) {
    			item = array[i];
    			break;
    		}
    	}
    	return item;
    }

    function calculateMaxCombinations (n, r) {
        /// <summary>Calculate number of possible combinations of 'r' elements out of a total of 'n' elements.</summary>
        /// <param name="n" type="Integer">Total number of elements to combine</param>
        /// <param name="r" type="Integer">Number of elements to combine</param>

        return Math.pow(n, r);
    }

    function isColorInBackpack (color) {
        /// <summary>Check whether a given color is already in the color backpack.</summary>
        /// <param name="color" type="String">Hexadecimal string representation of a color</param>

        if (options.useBackpack) {
            var hash = pluck(backpack, 'value');
            if (contains(hash, color)) {
                return true;
            }
        }
        return false;
    }

    function generateColor () {
        /// <summary>Randomly generates a color using the source palette.</summary>
        
        var color = '#';
        if (options.useStaticBackpack) {
            color += staticBackpack[staticIndex];
            staticIndex++;
        } else {
            for (var i = 0; i < 6; i++ ) {
                color += palette[Math.floor(Math.random() * palette.length)];
            }
        }
        return color;
    }

    function newColor (key) {
        /// <summary>Generates a new random color and returns it. If the backpack is in use the color will be unique and put in the backpack.</summary>
        /// <param name="key" type="String">Name under which the color will be stored in the backpack</param>

        var finish = false;
        var color;            

        while (!finish) {
            if (limit == trunk.length)
                return; //all possible combinations of colors have already been generated

            //generate new color
            color = generateColor();

            if (contains(trunk, color))
                continue;

            trunk.push(color);

            //check if color already in backpack
            if (isColorInBackpack(color))
                continue;

            //check if too dark
            if (color.split('0').length >= 4 && options.avoidDarks)                
                continue;

            //check if too light
            if (color.split('F').length >= 4 && options.avoidLights)
                continue;
            
            if (options.useBackpack) {
                backpack.push({ key: !!key ? key : color, value: color });
            }
            finish = true;
        }

        return color;
    }

    //#endregion

    //#region Public methods

    function getBackpack () {
        return backpack;
    }

    function getColor (key) {
        /// <summary>Retrieves color with given 'key' from the color backpack, or returns a new color if no 'key' is provided.</summary>
        /// <param name="key" type="String">Name of color to be retrieved</param>

        //recalculate limit since the generation mode might have changed
        limit = options.useStaticBackpack ? staticBackpack.length : calculateMaxCombinations(palette.length, 6);

        if (options.useBackpack && backpack.length) {
            if (!!key) {
                var color = find(backpack, function (i) { return i.key === key; });
                if (!!color) {
                    return color.value;
                }
            }
        }
        return newColor(key);
    }

    function getAllColors () {
        /// <summary>Generate all the possible colors given the current source palette.</summary>

        if (limit > 1000) {
            console.log('Sorry, there are too many possible combinations and I am afraid the browser might crash :S');
            return;
        }

        var results = [];
        var _combine = function (got) {        
            if (got.length === 6) {              
                results.push('#' + got.join(''));
                return;
            }
            for (var i = 0; i < palette.length; i++) {
                got.push(palette[i]);
                _combine(got);
                got.pop();
            }       
        };
        _combine([], 0);    
        return results;
    }

    function reset () {
        /// <summary>Resets the color backpack and the trunk, to start generating colors all over again.</summary>

        trunk = [];
        backpack = [];
        staticIndex = 0;
    }

    //#endregion

    return {
    	options: options,
    	staticBackpack: staticBackpack,
        getBackpack: getBackpack,
        getColor: getColor,
        getAllColors: getAllColors,
        reset: reset
    };     
}