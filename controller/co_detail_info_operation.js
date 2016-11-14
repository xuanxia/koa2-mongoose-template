const detailInfoOperationBiz = require('../business/biz_detail_info_operation.js');
const logger = require('../comm_unit/log4js.js');
var query = async(ctx,next)=>{
    logger.debug(ctx.request.body);
    const returnData = await detailInfoOperationBiz.findOne(ctx.request.body);
    ctx.response.type = 'application/json';
    ctx.response.body = returnData
};
module.exports = {
    'POST /detail_info_operation/query/': query
};