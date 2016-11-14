const url_operation_biz = require('../business/biz_url_operation.js');
const logger = require('../comm_unit/log4js.js');
var query = async(ctx,next)=>{
    logger.debug(ctx.request.body);
    const returnData = await url_operation_biz.query(ctx.request.body);
    ctx.response.type = 'application/json';
    ctx.response.body = returnData
};

module.exports = {
    'POST /url_operation/query/': query
};