var Device = require('zetta').Device;
var util = require('util');
var bone = require('bonescript');

var RGBLed = module.exports = function(opts) {
  Device.call(this);
  opts = opts || {};
  this.rLed = opts.rLed || "P9_14";
  this.gLed = opts.gLed || "P9_16";
  this.bLed = opts.bLed || "P9_22";
  this.red = 0;
  this.blue = 0;
  this.green = 0;
  this._red = false;
  this._green = false;
  this._blue = false;

  //Everything is off to start
  bone.analogWrite(this.rLed, calculateColor(this.red));
  bone.analogWrite(this.gLed, calculateColor(this.green));
  bone.analogWrite(this.bLed, calculateColor(this.blue));
};
util.inherits(RGBLed, Device);

RGBLed.prototype.init = function(config) {
  config
    .state('on')
    .type('led')
    .when('on', { allow: ['toggleRed', 'toggleBlue', 'toggleGreen', 'setColor'] })
    .map('toggleRed', this.toggleRed)
    .map('toggleBlue', this.toggleBlue)
    .map('toggleGreen', this.toggleGreen)
    .map('setColor', this.setColor, [{name:'color', type:'color'}])
    .monitor('red')
    .monitor('blue')
    .monitor('green')
    .monitor('rgb');
};

RGBLed.prototype.toggleRed = function(cb) {
  this._red = !this._red;
  if(this._red) {
    this.red = 255;
  } else {
    this.red = 0;
  }

  bone.analogWrite(this.rLed, calculateColor(this.red));
  if(cb) {
    cb();
  }
};

RGBLed.prototype.toggleBlue = function(cb) {
  this._blue = !this._blue;
  if(this._blue) {
    this.blue = 255;
  } else {
    this.blue = 0;
  }
  
  bone.analogWrite(this.bLed, calculateColor(this.blue));
  if(cb) {
    cb();
  }
};

RGBLed.prototype.toggleGreen = function(cb) {
  
  this._green = !this._green;
  if(this._green) {
    this.green = 255;
  } else {
    this.green = 0;
  }
  bone.analogWrite(this.gLed, calculateColor(this.green));

  if(cb) {
    cb();
  }
};

RGBLed.prototype.setColor = function(color, cb) {
  var red = convertToInt(color.slice(1,3));
  var green = convertToInt(color.slice(3, 5));
  var blue = convertToInt(color.slice(5, 7));

  var redCode = calculateColor(red);
  var greenCode = calculateColor(green);
  var blueCode = calculateColor(blue);

  this.red = redCode;
  this.green = greenCode;
  this.blue = blueCode;

  bone.analogWrite(this.rLed, redCode);
  bone.analogWrite(this.bLed, greenCode);
  bone.analogWrite(this.gLed, blueCode);
  if(cb) {
    cb();
  }
};

function convertToInt(code) {
  var buf = new Buffer(1);
  buf.write(code, 0, 1, 'HEX');
  return buf.readUInt8(0);
}

function calculateColor(color) {
  return color / 255;
}

