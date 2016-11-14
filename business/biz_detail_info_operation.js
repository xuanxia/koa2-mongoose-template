const db = require('../comm_unit/db_conn.js');
const mongoose = require("mongoose");
const OperationVo = require('../dbm/detail_info_operation.js');
const OperationSchema = new mongoose.Schema(OperationVo);
const OperationModel = db.model("detail_info_operation",OperationSchema,"detail_info_operation");
const logger = require('../comm_unit/log4js.js');
const ResultData = require('../comm_unit/data_structure.js').ResultData;

//初始化 将数据库中的数据清空
module.exports.init  = async()=>{
    let prams = {
        detailInfoIsReady:   false,  //获取详情地址是否完成,
        pageCount        :   0,   //待处理页面总数量
        detailInfoSuccessCount  :   0,   //已经获取详情并入库成功数量
        detailInfoQueryFailsCount  :   0,   //获取详情页面失败数量
        detailInfoSaveFailsCount  :   0,   //入库失败数量
        detailInfoQueryTime   :   0,  //搜索页面花费总时长
        detailInfoSaveTime    :   0  //保存页面花费总时长
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
