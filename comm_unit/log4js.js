const log4js = require('log4js');
const config = require('../config.js');
log4js.configure(config.log4js);
const logger = log4js.getLogger('debug');
module.exports = logger;