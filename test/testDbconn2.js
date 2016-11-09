const db = require('./dbconn2.js');
const assert = require("assert");
const mongoose = require("mongoose");
const TemplateVo = require('../dbm/Template.js');

   // assert.equal(Band.collection.findOne().constructor, require('bluebird'))
    console.log("===========mongodb连接成功============");
    const TemplateSchema = new mongoose.Schema(TemplateVo,{collection:"template_base"});
    const TemplateModel = db.model("template_base",TemplateSchema);
    /* const template = new TemplateModel({
     "imgUrl": "http://www.cssmoban.com/UploadFiles/2016/2/2016102614261278402.jpg",
     "keyword": "test",
     "preViewPath": "test",
     "previewUrl": "http://demo.cssmoban.com/cssthemes3/cpts_469_ua/index.html",
     "qiniuHash": "testFq2YNbB1hMGx7iKIffVyOyFCFMJF",
     "qiniuUrl": "/web1477649128613q3mp0_1.zip",
     "title": "宽屏响应式后现代家居企业网站模板",
     "type": "test"
     });
     template.save(function (err) {
     if (err) return handleError(err);
     // saved!
     });*/
    TemplateModel.find().limit(10).exec(function(err,dataList){
        if(err){
            console.log("===err===");
            throw  err;
        }else{
            console.log(dataList);
        }
});