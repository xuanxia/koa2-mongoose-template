const logger = require('../comm_unit/log4js.js');
const fs = require('fs');
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            logger.info(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            logger.info(`register URL mapping: POST ${path}`);
        } else {
            logger.info(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router) {
    var files = fs.readdirSync(__dirname.replace(/comm_unit/,'controller'));
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        logger.info(`process controller: ${f}...`);
        let mapping = require(__dirname.replace(/comm_unit/,'controller') +"/"+ f);
        addMapping(router, mapping);
    }
}

module.exports = function(dir){
    let
        controllers_dir = dir || 'controller', // 如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};
