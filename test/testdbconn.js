const mongoose = require('./dbconn.js');
const db = mongoose.connection;
const TemplateVo = require('../dbm/template.js');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
        console.log("===========mongodb连接成功============");
        const TemplateSchema = mongoose.Schema(TemplateVo,{collection:"template_base"});
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

});