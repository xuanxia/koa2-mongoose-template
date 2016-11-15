const db = require('../comm_unit/db_conn.js');
const mongoose = require("mongoose");
const DetailInfoVo = require('../dbm/detail_Info.js');
const DetailInfoSchema = new mongoose.Schema(DetailInfoVo);
const DetailInfoModel = db.model("detail_info",DetailInfoSchema,"detail_info");
const logger = require('../comm_unit/log4js.js');
const ResultData = require('../comm_unit/data_structure.js').ResultData;
const PageData = require('../comm_unit/data_structure.js').PageData;
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
module.exports.update = async(prams)=>{
    let returnData = new ResultData();
    await DetailInfoModel.update({ _id: prams.id }, { $inc: { downloadCount: 1 }}).exec(function(err,result){
        if(err){
            logger.error("biz_template.js--update"+err);
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

module.exports.query = async (prams)=>{
    let returnData = new ResultData();
    /*({keyword:{"$regex":/简洁/},}).limit(10).skip(10).sort({"likes":-1})*/
    let regexStr="";
    if(prams.keyword){
        regexStr = prams.keyword.split(" ").join("|");
    }
    let regex = new RegExp(regexStr,'i');
    let currentpage = parseInt(prams.currentpage) || 1;
    let limitCount = parseInt(prams.pagesize)   || 32;
    let skipCount = (currentpage - 1) * limitCount || 0 ;
    let sortconf = {};
    if(prams.sortname){
        sortconf[prams.sortname] = (prams.sorttype == 1 ? 1 : -1);
    }
    let total = 0;
    await DetailInfoModel.find({ $or:[{keyword:{"$regex":regex}},{title:{"$regex":regex}}]}).count().exec(function(err,count){
        if(err){
            logger.error("biz_template.js--query"+err);
            returnData.setStatus(0);
            returnData.setMessage("查询失败");
        }else{
            logger.debug(count);
            total = count;
        }
    });
    await DetailInfoModel.find({ $or:[{keyword:{"$regex":regex}},{title:{"$regex":regex}}]}).skip(skipCount).limit(limitCount).sort(sortconf).exec(function(err,result){
        if(err){
            logger.error("biz_template.js--query"+err);
            returnData.setStatus(0);
            returnData.setMessage("查询失败");
        }else{
            let pageData = new PageData();
            pageData.setDatalist(result);
            /*(page,pagesize,total,sortName,sortType,keyword)*/
            logger.debug(prams.keyword);
            pageData.setModel(currentpage,limitCount,total,prams.sortname ||"",prams.sorttype||"",prams.keyword ||"");
            returnData.setStatus(1);
            returnData.setMessage("查询成功");
            returnData.setData(pageData);
        }
    });
    return returnData;
};
