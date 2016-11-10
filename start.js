var register = require('babel-core/register');

register({
    presets: ['stage-3']
});
//require('./crawler/cra_pageurl.js');
require('./app.js');