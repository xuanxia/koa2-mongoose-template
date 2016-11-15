/*
 *
 * @controller  启动爬取资源详细信息方法
 * */
const logger = require('../comm_unit/log4js.js');
const setDetailInfo = require('../crawler/cra_detail_info.js');
const ResultData = require('../comm_unit/data_structure.js').ResultData;
const ErrData = require('../comm_unit/data_structure.js').ErrData;
const isCrawler = require('../business/biz_is_crawling.js');
const detailInfoBiz = require('../business/biz_detail_info.js');
const config = require('../config.js');
const crawler = async(ctx,next)=>{
    logger.info(ctx.request.body);
    let returnData   = new ResultData();
    //  判断爬虫是否正在操作
    let status = await isCrawler.isCrawling();
    if(status){
        setDetailInfo(); // 不采用同步方式返回数据 将操作数据记录在中间表中 通过前端轮询查看进度
        returnData.setStatus(1);
        returnData.setData({});
        returnData.setMessage("后台爬虫启动成功");
    }else{
        returnData.setStatus(0);
        returnData.setData({});
        returnData.setMessage("后台爬虫已经在运行中");
    }



    ctx.response.type = 'application/json';
    ctx.response.body = returnData;
};
const query = async(ctx,next)=>{
    const returnData = await detailInfoBiz.query(ctx.query);
    if(returnData.status === 1){
        ctx.render('demo.html', {
            title: '测试页面',
            baseInfo:config.baseInfo,
            items:returnData.data.datalist,
            model:returnData.data.model
        });
    }else{
        let errData = new ErrData();
        errData.setCode(500);
        errData.setMessage(returnData.message);
        ctx.errData = errData;
        await next();
    }


};

module.exports = {
    'POST /detail_info/crawler/': crawler,
    'GET /demo/':query
};