const request = require('request');
const cheerio = require('cheerio');
const logger = require('../comm_unit/log4js.js');
const rp = require('request-promise');
const pageUrlBiz = require('../business/biz_page_url.js');
const operationBiz = require('../business/biz_page_url_operation.js');
const ResultData = require('../comm_unit/data_structure.js').ResultData;
let url = "http://www.cssmoban.com/cssthemes/";
/*
 * 获取总页面数
 *
 * */
const  getCount = async ()=>{
    let count = 0;
    await rp(url).then(function(body){
        $ = cheerio.load(body);
        count = parseInt($("#pagelist span").text().replace(/总共/,"").replace(/页/,""));
        logger.info("总页数获取成功： 一共"+count+"页");
    }).catch(function(err){
        logger.error("抓取"+firsturl+"网页发生错误："+err);
    });
    return count;
};

/*
 *
 * 获取所有资源的详情页地址
 *
 * */

const getDetailPage = async ()=>{
    let pageList = []; //使用数组作为缓存
    let count = await getCount();
    //let count = 2; // 测试时使用
    await  operationBiz.init(); //执行之前先初始化一次 清理上次爬取的数据
    await  operationBiz.update({pageCount:count}); //保存操作记录
    for(let i = count; i >= 1;i --){
        let nextUrl =  url + "index_"+i+".shtml";
        await rp(nextUrl).then(function(body){
            logger.debug("当前请求: "+nextUrl +" 成功");
            $ = cheerio.load(body);
            $(".thumbItem").eq(0).find("li").each(function(index,item){
                const liDom = $(item);
                let temp = {};
                temp["detailUrl"] = "http://www.cssmoban.com" + liDom.find("a").eq(0).attr("href");
                temp["status"] = false;
                logger.debug(temp);
                pageList.push(temp);
            });
        }).catch(function(err){
            logger.info("抓取"+nextUrl+"网页发生错误："+err);
        });
        if(i%10){
            await  operationBiz.update({pageUrlCount:pageList.length}); //保存操作记录 供前端轮询查看进度
        }

    }
    logger.info("请求全部完成，共收录"+pageList.length+"条记录");
    return pageList
};

/*
 *
 * 先查询 后保存
 *
 * */

const queryThenSave = async()=>{
    let returnData = new ResultData();
    let queryTimeStart = new Date().getTime();  //爬页面开始时间
    let pageList = await getDetailPage();
    let queryTime = new Date().getTime() - queryTimeStart;  //爬页面耗时间
    await  operationBiz.update({pageUrlQueryTime:queryTime,pageUrlCount:pageList.length,pageUrlQueryReady:true}); //保存操作记录
    let data = {};
    data["queryTime"] = queryTime; //爬页面耗时
    data["pageUrlCount"] = pageList.length; //总条数
    data["pageUrlDbCount"] = 0; //成功条数
    data["pageUrlFailCount"]    = 0; //失败条数
    data["pageUrlDbExistCount"]   = 0; //已存在条数
    let saveTimeStart = new Date().getTime();  //保存数据库开始时间
    for(let i =0,len = pageList.length;i<len; i++){
        let item =  pageList[i];
        let queryResult = await pageUrlBiz.findOne({detailUrl:item.detailUrl});
        //有内容表示已保存过了
        if( queryResult.data){
            data["pageUrlDbExistCount"] ++;
        }else{
            let saveResult = await  pageUrlBiz.save(item);
            logger.debug(saveResult);
            if(saveResult.status){

                data["pageUrlDbCount"] ++;
            }else{
                data["pageUrlFailCount"] ++;
            }
        }
        if(i%100){
            await  operationBiz.update({
                pageUrlDbCount:data["pageUrlDbCount"],
                pageUrlDbExistCount:data["pageUrlDbExistCount"],
                pageUrlFailCount:data["pageUrlFailCount"]

            }); //保存操作记录 供前端轮询查看进度
        }

    }
    data["saveTime"] = new Date().getTime() - saveTimeStart;  //保存数据库耗时
    await  operationBiz.update({
        pageUrlSaveTime:data["saveTime"],
        pageUrlDbCount:data["pageUrlDbCount"],
        pageUrlDbExistCount:data["pageUrlDbExistCount"],
        pageUrlFailCount:data["pageUrlFailCount"],
        pageUrlIsReady:true
    }); //保存操作记录
    returnData.setStatus(1);
    returnData.setMessage("页面检索完毕");
    returnData.setData(data);
    return returnData;
};


module.exports = async()=>{
    return  await queryThenSave();
};










