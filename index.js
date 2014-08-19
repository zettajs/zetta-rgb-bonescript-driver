var util = require('util');
var AutoScout = require('zetta-auto-scout');
var LED = require('./rgb_led_driver');

var BoneScout = module.exports = function(opts) {
  AutoScout.call(this, 'led', LED, opts);
};
util.inherits(BoneScout, AutoScout);
