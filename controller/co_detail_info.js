/*
 *
 * @controller  启动爬取资源详细信息方法
 * */
const logger = require('../comm_unit/log4js.js');
const setDetailInfo = require('../crawler/cra_detail_info.js');
const ResultData = require('../comm_unit/data_structure.js').ResultData;
const crawler = async(ctx,next)=>{
    logger.info(ctx.request.body);
    //TODO  判断爬虫是否正在操作
    setDetailInfo(); // 不采用同步方式返回数据 将操作数据记录在中间表中 通过前端轮询查看进度
    let returnData   = new ResultData();
    returnData.setStatus(1);
    returnData.setData({});
    returnData.setMessage("后台爬虫已启动");
    ctx.response.type = 'application/json';
    ctx.response.body = returnData;
};

module.exports = {
    'POST /detail_info/crawler/': crawler
};