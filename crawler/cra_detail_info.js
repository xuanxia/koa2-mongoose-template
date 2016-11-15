/*
*  将数据库中未处理的页面记录查询出来 然后依次爬取信息入库
* */
const request = require('request');
const cheerio = require('cheerio');
const logger = require('../comm_unit/log4js.js');
const rp = require('request-promise');
const pageUrlBiz = require('../business/biz_page_url.js');
const detailInfoBiz = require('../business/biz_detail_info.js');
const operationBiz = require('../business/biz_detail_info_operation.js');
/*
* 获取数据库中 没有查询的获取详细信息的url数组
*
* */
const getDetailPageArray = async(prams)=>{
    let resultData =  await pageUrlBiz.find(prams);
    if(resultData.status){
        return resultData.data;
    }else{
        return [];
    }


};

/*
*
* 爬虫 抓取详情详细
*@prams url
* @return resultData  null || {}
* */
const getDetailInfo = async(url)=>{
    let resultData = null;
    await rp(url).then(function(body){
        resultData = {};
        logger.debug("当前请求: "+url +" 成功");
        $ = cheerio.load(body);
        /*
         * 关键字获取
         * */
        let keyword=[];
        $(".tags").eq(0).find("a").each(function(index,item){
            keyword.push($(item).text());
        });
        resultData["keyword"] = keyword.join(",");
        /*
        *
        * 标题获取
        * */
        let title = $(".con-right>h1").eq(0).text();
        resultData["title"] = title;
        /*
         * 文件下载地址获取
         * */
        let downLoadUrl = $(".btn").find("a").eq(1).attr('href');

        resultData["downLoadUrl"] = downLoadUrl;

        /*
        * 预览地址获取
        *
        * */
        let previewUrl = $(".btn").find("a").eq(0).attr('href');

        resultData["previewUrl"] = previewUrl;


        /*
        * 图片地址
        * */
        let imgUrl = $(".large-Imgs>img").eq(0).attr("src");
        resultData["imgUrl"] = imgUrl;

        /*
         * 是否已经下载了
         * */
        resultData["isDownLoad"] = false;

    }).catch(function(err){
        logger.info("抓取"+nextUrl+"网页发生错误："+err);
        return resultData;
    });

    return resultData;
};

const setDetailInfo =  async()=>{
    let DetailPageArray = await getDetailPageArray({status:false});
    await  operationBiz.init(); //执行之前先初始化一次 清理上次爬取的数据
    await  operationBiz.update({pageCount:DetailPageArray.length}); //保存操作记录
    let data = {};
    data["detailInfoSuccessCount"]      = 0; //成功条数
    data["detailInfoQueryFailsCount"]   = 0; //抓取失败条数
    data["detailInfoSaveFailsCount"]    = 0; //保存失败条数
    let detailInfoQueryAndSaveTimeStart = new Date().getTime();  //爬页面开始时间
    for(let i=0,len=DetailPageArray.length;i<len;i++){
      let item = DetailPageArray[i];
      let detailInfo = await getDetailInfo(item.detailUrl);
      //获取成功
      if(detailInfo){
          logger.debug("========抓取单条数据详情=======");
          logger.debug(detailInfo);
            let saveResult = await detailInfoBiz.save(detailInfo);
            if(saveResult.status){
                await pageUrlBiz.update({id:item.id,status:true});
                data["detailInfoSuccessCount"] ++;
            }else{
                data["detailInfoSaveFailsCount"] ++;
            }
      }else{
          data["detailInfoQueryFailsCount"] ++;
      }

        await  operationBiz.update({
            detailInfoSuccessCount:data["detailInfoSuccessCount"],
            detailInfoQueryFailsCount:data["detailInfoQueryFailsCount"],
            detailInfoSaveFailsCount:data["detailInfoSaveFailsCount"]
        }); //保存操作记录
    }
    data["detailInfoQueryAndSaveTime"] = new Date().getTime() - detailInfoQueryAndSaveTimeStart;//保存数据库耗时
    await  operationBiz.update({
        detailInfoQueryAndSaveTime:data["detailInfoQueryAndSaveTime"],
        detailInfoSuccessCount:data["detailInfoSuccessCount"],
        detailInfoQueryFailsCount:data["detailInfoQueryFailsCount"],
        detailInfoSaveFailsCount:data["detailInfoSaveFailsCount"],
        detailInfoIsReady:true
    }); //保存操作记录
    return null;
};
module.exports = async()=>{
    return await setDetailInfo();
};
