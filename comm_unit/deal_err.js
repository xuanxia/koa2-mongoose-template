const ResultData = require('../comm_unit/data_structure.js').ResultData;
function dealErr() {
    return async (ctx, next) => {
        //手动判断错误处理 ctx挂载了errData数据
        //GET 请求表示页面 资源的请求
        if(ctx.request.method ==="GET"){
            if (ctx.errData) {
                if(ctx.errData.code ===500){
                    ctx.response.status = 500;
                    ctx.render('500.html', {message: ctx.errData.message});
                }
                //TODO 继续添加类型


            }else{
                //框架捕获的错误处理

                if(ctx.response.status ===500){
                    ctx.render('500.html', {message: "系统错误"});
                }

                if(ctx.response.status ===404){
                    ctx.render('404.html');
                }

                //TODO

            }
        }

        else if(ctx.request.method ==="POST"){
            ctx.response.type = 'application/json';
            if (ctx.errData) {
                ctx.response.status = 500;
                ctx.response.body = ctx.errData;

                //TODO 继续添加类型
            }else{
                //框架捕获的错误处理
                if(ctx.response.status ===500){
                    ctx.response.status = 500;
                    let resultData = new ResultData();
                    resultData.setStatus(0);
                    resultData.setMessage("系统错误");
                    ctx.response.body = resultData;
                }

                if(ctx.response.status ===404){
                    let resultData = new ResultData();
                    resultData.setStatus(0);
                    resultData.setMessage("接口不存在");
                }
                //TODO

            }



        }



    }
}

module.exports = dealErr;