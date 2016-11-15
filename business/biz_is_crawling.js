const db = require('../comm_unit/db_conn.js');
const mongoose = require("mongoose");
const detailInfoOperationVo = require('../dbm/detail_info_operation.js');
const detailInfoOperationSchema = new mongoose.Schema(detailInfoOperationVo);
const detailInfoOperationModel = db.model("detail_info_operation",detailInfoOperationSchema,"detail_info_operation");
const pageUrlOperationVo = require('../dbm/page_url_operation.js');
const pageUrlOperationSchema = new mongoose.Schema(pageUrlOperationVo);
const pageUrlOperationModel = db.model("page_url_operation",pageUrlOperationSchema,"page_url_operation");
const logger = require('../comm_unit/log4js.js');
module.exports.isCrawling= async(prams)=>{
    let returnData = false;
    let detailInfo = {};
    await detailInfoOperationModel.findOne(prams).exec(function(err,result){
        if(err){

            logger.error(err);
            //TODO 异常处理
        }else{
            if(result){
                detailInfo = result;
            }else{
                returnData = true;
            }

        }
    });
    if(detailInfo.detailInfoIsReady) {
        let pageUrl = {};
        await  pageUrlOperationModel.findOne(prams).exec(function (err, result) {
            if (err) {

                logger.error(err);
                //TODO 异常处理
            } else {
                if(result){
                    pageUrl = result;
                }else{
                    returnData = true;
                }
            }
        });
        if (pageUrl.pageUrlIsReady) {
            returnData = true;
        }
    }

    return returnData;
};