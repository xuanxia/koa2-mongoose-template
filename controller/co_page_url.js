/*
*
* @controller pageurl 负责处理 由各个网站的下载页面地址
* */
const page_url_biz = require('../business/biz_page_url.js');
const logger = require('../comm_unit/log4js.js');
const getPageUrlList = require('../crawler/cra_page_url.js');
const ResultData = require('../comm_unit/data_structure.js').ResultData;
var update = async(ctx,next)=>{
    logger.debug(ctx.request.body);
   // const returnData = await page_url_biz.update(ctx.request.body);
    getPageUrlList(); // 不采用同步方式返回数据 将操作数据记录在中间表中 通过前端轮询查看进度
    let returnData    = new ResultData();
    returnData.setStatus(1);
    returnData.setData({});
    returnData.setMessage("后台爬虫已启动");
    ctx.response.type = 'application/json';
    ctx.response.body = returnData;
};



module.exports = {
    'POST /page_url/update/': update
};