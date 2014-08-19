var zetta = require('zetta');
var RGB = require('../index');

zetta()
  .use(RGB, { rLed: 'P9_23', gLed: 'P9_25', bLed: 'P9_27' })
  .listen(3000, function() {
    console.log('Listening on port 3000')
  });
