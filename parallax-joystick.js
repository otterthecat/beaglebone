/*
    This is a modified script that was found here:
        http://beagleboard.org/support/BoneScript/2AxisThumbJoystick/

    Note, however that the below code was using the Parallax 2 Axis Joystick,
    which though it has a different layout, can be wired up very similar to the
    BeagleBone tutorial above
        http://www.parallax.com/product/27800

    The modifications made to the code allow for continuous value updating and
    compenesate (rather clumsily) for what appears to be a bug in bonescript where
    multiple analog reads can throw errors. The console will still log errors, howevever
    now, instead of assigning X/Y posistions a string value of 'NaN', the value will instead
    be what the previous valid value was.
 */

var b = require('bonescript');
var pos = {};
var prevX = 0;
var prevY = 0;

function onX(x) {
    'use strict';
    'use strict';
    var num = parseFloat(x.value * 100).toFixed(2);
    pos.x = num !== 'NaN' ? num : prevX; // handle odd issue where analog can't be read every 15 reads or so
    prevX = pos.x

    b.analogRead('P9_38', onY);
}

function onY(y) {
    'use strict';
    var num = parseFloat(y.value * 100).toFixed(2);
    pos.y = num !== 'NaN' ? num : prevY; // handle odd issue where analog can't be read every 15 reads or so
    prevY = pos.y

	console.log(JSON.stringify(pos));
}

var count = 0;
var limit = 50;

var interval = setInterval(function(){
    b.analogRead('P9_36', onX);

    count += 1;

    if(count > limit){
        clearInterval(interval);
    }
}, 100);