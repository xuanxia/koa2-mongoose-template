const db = require('../comm_unit/db_conn.js');
const mongoose = require("mongoose");
const DetailInfoVo = require('../dbm/detail_Info.js');
const DetailInfoSchema = new mongoose.Schema(DetailInfoVo);
const DetailInfoModel = db.model("detail_info",DetailInfoSchema,"detail_info");
const logger = require('../comm_unit/log4js.js');
const ResultData = require('../comm_unit/data_structure.js').ResultData;

module.exports.save = async(prams)=>{
    let returnData = new ResultData();
    /*
    * 增加createTime 和 updateTime
    * */
    prams["createDate"] = new Date();
    prams["updateDate"] = new Date();
    let DetailInfo = new  DetailInfoModel(prams);
    await DetailInfo.save(prams,function(err,result){
        if(err){
            logger.error(err);
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
