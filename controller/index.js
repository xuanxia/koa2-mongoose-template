const config = require('../config.js');
const templateBiz = require('../business/biz_template.js');
const ErrData = require('../comm_unit/data_structure.js').ErrData;
const fn_index = async(ctx,next)=>{
    const returnData = await templateBiz.query(ctx.query);
    if(returnData.status === 1){
        ctx.render('index.html', {
            title: '首页',
            baseInfo:config.baseInfo,
            items:returnData.data.datalist,
            model:returnData.data.model
        });
    }else{
        let errData = new ErrData();
        errData.setCode(500);
        errData.setMessage(returnData.message);
        ctx.errData = errData;
       await next();
    }


};


module.exports = {
    'GET /': fn_index
};