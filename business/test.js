const db = require('../comm_unit/dbconn.js');
const mongoose = require("mongoose");
const PageUrlVo = require('../dbm/Pageurl.js');
const PageUrlSchema = new mongoose.Schema(PageUrlVo);
const PageUrlModel = db.model("pageurl",PageUrlSchema,"page_url");
const logger = require('../comm_unit/log4js.js');
const ResultData = require('../comm_unit/data_structure.js').ResultData;
let returnData = new ResultData();
let prams = { detialUrl: 'http://www.cssmoban.comundefined', status: false };
let pageUrl = new  PageUrlModel(prams);
pageUrl.save(prams,function(err,result){
    if(err || !result.status){
        logger.error("biz_pageurl.js--save"+err);
        returnData.setStatus(0);
        returnData.setMessage("新增失败");
    }else{
        logger.debug(result);
        returnData.setStatus(1);
        returnData.setMessage("新增成功");
        returnData.setData(result);
    }
    console.log(returnData);
});