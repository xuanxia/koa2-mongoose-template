const db = require('../comm_unit/db_conn.js');
const mongoose = require("mongoose");
const OperationVo = require('../dbm/page_url_operation.js');
const OperationSchema = new mongoose.Schema(OperationVo);
const OperationModel = db.model("page_url_operation",OperationSchema,"page_url_operation");
const logger = require('../comm_unit/log4js.js');
const ResultData = require('../comm_unit/data_structure.js').ResultData;

//初始化 将数据库中的数据清空
module.exports.init  = async()=>{
    let prams = {
        pageUrlIsReady:   false,  //获取详情地址是否完成,
        pageUrlQueryReady:   false,  //获取详情地址是否完成,
        pageCount     :   0,   //已获取页面总数
        pageUrlCount  :   0,   //已搜索详情地址数量
        pageUrlDbCount:   0,   //已保存详情地址数量
        pageUrlDbExistCount:   0,   //已存在地址数量
        pageUrlFailCount   :   0,   //保存时失败的数量
        pageUrlQueryTime   :   0,  //搜索页面花费时长
        pageUrlSaveTime    :   0  //保存页面花费时长
    };
    let returnData = new ResultData();
    let option = null;
    await OperationModel.findOne({}).exec(function(err,result){
        option = result;
    });
   
    if(!option){
        let options = new  OperationModel(prams);
        await options.save(prams,function(err,result){
            if(err){
                logger.error("biz_page_url.js--save"+err);
                returnData.setStatus(0);
                returnData.setMessage("初始化失败");
            }else{
                logger.debug(result);
                returnData.setStatus(1);
                returnData.setMessage("初始化成功");
                returnData.setData(result);
            }
        });

        return returnData;
    }else{
        await OperationModel.update( { $set: prams}).exec(function(err,result){
            if(err){
                logger.error("biz_Operation.js--update"+err);
                returnData.setStatus(0);
                returnData.setMessage("初始化失败");
            }else{
                logger.debug(result);
                returnData.setStatus(1);
                returnData.setMessage("初始化成功");
                returnData.setData(result);
            }
        });

        return returnData;
    }
};

module.exports.update = async(prams)=>{
    let returnData = new ResultData();
    prams["updateTime"] = new Date();
    logger.debug("==================operation update===================");
    logger.debug(prams);
    await OperationModel.update( { $set: prams}).exec(function(err,result){
        if(err){
            logger.error("biz_Operation.js--update"+err);
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

module.exports.findOne = async(prams)=>{
    let returnData = new ResultData();
    await OperationModel.findOne(prams).exec(function(err,result){
        logger.info("查询结果==============");
        logger.info(result);
        if(err){
            logger.error("biz_Operation.js--update"+err);
            returnData.setStatus(0);
            returnData.setMessage("查询失败");
        }else{
            logger.debug(result);
            returnData.setStatus(1);
            returnData.setMessage("查询成功");
            returnData.setData(result);
        }
    });
    return returnData;
};
