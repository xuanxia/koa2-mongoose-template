var register = require('babel-core/register');

register({
    presets: ['stage-3']
});
//require('./crawler/cra_pageurl2.js');
require('./app.js');