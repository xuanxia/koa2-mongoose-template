/*
*
* @controller pageurl 负责处理 由各个网站的下载页面地址
* */
const pageurlBiz = require('../business/biz_pageurl.js');
const logger = require('../comm_unit/log4js.js');
const getPageUrlList = require('../crawler/cra_pageurl2.js');

var update = async(ctx,next)=>{
    logger.debug(ctx.request.body);
   // const returnData = await pageurlBiz.update(ctx.request.body);
    let returnData = await getPageUrlList();
    ctx.response.type = 'application/json';
    ctx.response.body = returnData
};



module.exports = {
    'GET /pageurl/update/': update
};