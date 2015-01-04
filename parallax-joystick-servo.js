var b = require('bonescript');

// for joystick
var pos = {};
var prevX = 0;
var prevY = 0; // not yet implemented

// for servo
var SERVO = 'P9_14';
b.pinMode(SERVO, b.OUTPUT);

var interval = setInterval(function(){
    b.analogRead('P9_36', function(x){
    	// The math below has been adjusted from that shown in this example:
        // http://beagleboard.org/support/BoneScript/ServoMotor/
        // which seems to work well for parallax joystick and
        // the radio shack micro servo
        var val = (parseFloat(x.value).toFixed(2) * 0.155) + .025;
        console.log(val);
        b.analogWrite(SERVO, val, 60);
    });
}, 50);