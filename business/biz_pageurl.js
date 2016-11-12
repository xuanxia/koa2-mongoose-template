const db = require('../comm_unit/dbconn.js');
const mongoose = require("mongoose");
const PageUrlVo = require('../dbm/Pageurl.js');
const PageUrlSchema = new mongoose.Schema(PageUrlVo);
const PageUrlModel = db.model("pageurl",PageUrlSchema,"page_url");
const logger = require('../comm_unit/log4js.js');
const ResultData = require('../comm_unit/data_structure.js').ResultData;

module.exports.save = async(prams)=>{
    let returnData = new ResultData();
    let pageUrl = new  PageUrlModel(prams);
    await pageUrl.save(prams,function(err,result){
        if(err){
            logger.error("biz_pageurl.js--save"+err);
            returnData.setStatus(0);
            returnData.setMessage("新增失败");
        }else{
            logger.debug(result);
            returnData.setStatus(1);
            returnData.setMessage("新增成功");
            returnData.setData(result);
        }
    });

    return returnData;
};

module.exports.update = async(prams)=>{
    let returnData = new ResultData();
    await PageUrlModel.update({ _id: prams.id }, { $set: { status: prams.status }}).exec(function(err,result){
        if(err){
            logger.error("biz_pageurl.js--update"+err);
            returnData.setStatus(0);
            returnData.setMessage("更新失败");
        }else{
            logger.debug(result);
            returnData.setStatus(1);
            returnData.setMessage("更新成功");
            returnData.setData(result);
        }
    });

    return returnData;
};

module.exports.remove = async(prams)=>{
    //TODO

};

module.exports.query = async(prams)=>{
    let returnData = new ResultData();
    await PageUrlModel.findOne(prams).exec(function(err,result){
        if(err){
            logger.error("biz_pageurl.js--update"+err);
            returnData.setStatus(0);
            returnData.setMessage("更新失败");
        }else{
            logger.debug(result);
            returnData.setStatus(1);
            returnData.setMessage("查询成功");
            returnData.setData(result);
        }
    });
    return returnData;
};
