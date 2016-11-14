var register = require('babel-core/register');

register({
    presets: ['stage-3']
});
//require('./crawler/cra_page_url2.js');
require('./app.js');