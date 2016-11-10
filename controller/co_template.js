const config = require('../config.js');
const templateBiz = require('../business/biz_template.js');
const logger = require('../comm_unit/log4js.js');
var update = async(ctx,next)=>{
    logger.debug(ctx.request.body);
    const returnData = await templateBiz.update(ctx.request.body);
    ctx.response.type = 'application/json';
    ctx.response.body = returnData
};

module.exports = {
    'POST /template/update/': update
};