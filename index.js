var AutoScout = require('zetta-auto-scout');
var LED = require('./rgb_led_driver');

module.exports = new AutoScout('led', LED);
