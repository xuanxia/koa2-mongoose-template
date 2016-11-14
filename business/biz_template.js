const db = require('../comm_unit/db_conn.js');
const mongoose = require("mongoose");
const TemplateVo = require('../dbm/template.js');
const TemplateSchema = new mongoose.Schema(TemplateVo);
const TemplateModel = db.model("template_base",TemplateSchema);
const logger = require('../comm_unit/log4js.js');
const ResultData = require('../comm_unit/data_structure.js').ResultData;
const PageData = require('../comm_unit/data_structure.js').PageData;
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
    await TemplateModel.find({ $or:[{keyword:{"$regex":regex}},{title:{"$regex":regex}}]}).count().exec(function(err,count){
        if(err){
            logger.error("biz_template.js--query"+err);
            returnData.setStatus(0);
            returnData.setMessage("查询失败");
        }else{
            logger.debug(count);
            total = count;
        }
    });
    await TemplateModel.find({ $or:[{keyword:{"$regex":regex}},{title:{"$regex":regex}}]}).skip(skipCount).limit(limitCount).sort(sortconf).exec(function(err,result){

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

module.exports.save = async(prams)=>{
        //TODO

};

module.exports.update = async(prams)=>{
    let returnData = new ResultData();
    await TemplateModel.update({ _id: prams.id }, { $inc: { downloadCount: 1 }}).exec(function(err,result){
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

module.exports.remove = async(prams)=>{
    //TODO

};