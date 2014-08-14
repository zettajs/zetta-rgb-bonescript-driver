var Device = require('zetta').Device;
var util = require('util');
var bone = require('bonescript');

var RGBLed = module.exports = function(opts) {
  Device.call(this);
  opts = opts || {};
  this.rLed = opts.rLed || "P9_23";
  this.gLed = opts.gLed || "P9_25";
  this.bLed = opts.bLed || "P9_27";
  this.red = 0;
  this.blue = 0;
  this.green = 0;
  this._red = false;
  this._green = false;
  this._blue = false;

  //Everything is off to start
  bone.digitalWrite(this.rLed, 0);
  bone.digitalWrite(this.gLed, 0);
  bone.digitalWrite(this.bLed, 0);
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

  bone.digitalWrite(this.rLed, this._red);
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
  
  bone.digitalWrite(this.bLed, this._blue);
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
  bone.digitalWrite(this.gLed, this._green);

  if(cb) {
    cb();
  }
};

