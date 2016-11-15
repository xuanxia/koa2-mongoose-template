/*
*
* @controller pageurl 负责处理 由各个网站的下载页面地址
* */
const logger = require('../comm_unit/log4js.js');
const getPageUrlList = require('../crawler/cra_page_url.js');
const ResultData = require('../comm_unit/data_structure.js').ResultData;
const isCrawler = require('../business/biz_is_crawling.js');
const crawler = async(ctx,next)=>{
    logger.info(ctx.request.body);
    let status = await isCrawler.isCrawling();
    let returnData    = new ResultData();
    if(status){
        getPageUrlList(); // 不采用同步方式返回数据 将操作数据记录在中间表中 通过前端轮询查看进度
        returnData.setStatus(1);
        returnData.setData({});
        returnData.setMessage("后台爬虫启动成功");
    }else{
        returnData.setStatus(0);
        returnData.setData({});
        returnData.setMessage("后台爬虫正在运行");
    }
    ctx.response.type = 'application/json';
    ctx.response.body = returnData;
};

module.exports = {
    'POST /page_url/crawler/': crawler
};