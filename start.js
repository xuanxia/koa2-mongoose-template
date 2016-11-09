var register = require('babel-core/register');

register({
    presets: ['stage-3']
});
//require('./test.js');
require('./app.js');