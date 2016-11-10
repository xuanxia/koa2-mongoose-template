const db = require('../comm_unit/dbconn.js');
const mongoose = require("mongoose");
const PageurlVo = require('../dbm/Pageurl.js');
const PageurlSchema = new mongoose.Schema(PageurlVo,{collection:"pageurl"});
const PageurlModel = db.model("pageurl",PageurlSchema);
const logger = require('../comm_unit/log4js.js');
const ResultData = require('../comm_unit/data_structure.js').ResultData;

module.exports.save = async(prams)=>{
    let returnData = new ResultData();
    await PageurlModel.save(prams).exec(function(err,result){
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

};

module.exports.update = async(prams)=>{
    let returnData = new ResultData();
    await PageurlModel.update({ _id: prams.id }, { $set: { status: prams.status }}).exec(function(err,result){
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