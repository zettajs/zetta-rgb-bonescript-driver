var util = require('util');
var AutoScout = require('zetta-auto-scout');
var Rgb = require('./rgb_driver');

var BoneScout = module.exports = function(pin) {
  AutoScout.call(this, 'rgb', Rgb, pin);
};
util.inherits(BoneScout, AutoScout);
