const request = require('request');
const cheerio = require('cheerio');
const logger = require('../comm_unit/log4js.js');
/*
 * 抓取详情页面地址  采用回调方式 仅供参考 项目中改为promise + async
 *
 * */
module.exports = ()=>{
    let templateArray = []; //使用数组作为缓存
    let CountArray = [];
    Array.prototype.setNumberSequence = function(number){
        if(typeof number === 'number'){
            if(/^[0-9]+[0-9]*[0-9]*$/.test(number)){
                for(var i=1;i<=number;i++){
                    this.push(i);
                }
                return this;
            }else{
                return this
            }
        }else{
            return this
        }
    };
    let firsturl = "http://www.cssmoban.com/cssthemes/";
    /*初始化*/
    (function init(){
        request(firsturl,function(error,response,body){
            if(!error && response.statusCode == 200){
                $ = cheerio.load(body);
                number = parseInt($("#pagelist span").text().replace(/总共/,"").replace(/页/,""));
                CountArray.setNumberSequence(parseInt(number));
                getDetailPage(firsturl);
            }else{
                logger.info("首页抓取失败 失败码："+response.statusCode);
                init();
            }
        });

        return templateArray;
    })();

    /*
     * 获取详情页面地址
     *
     * */
    let retryObj = {}; //重试对象 用来记录 出错请求的重试次数
    function getDetailPage(url){
        request(url,function(error,response,body){
            if(!error && response.statusCode == 200){
                logger.debug("当前请求: "+url +" 成功");
                $ = cheerio.load(body);
                $(".thumbItem").eq(0).find("li").each(function(index,item){
                    const liDom = $(item);
                    let temp = {};
                    temp["detialUrl"] = "http://www.cssmoban.com" + liDom.find("a").eq(0).attr("href");
                    temp["status"] = false;
                    templateArray.push(temp);
                });
                let CountNumber = CountArray.shift();
                let  nexturl = firsturl +"index_"+CountNumber+".shtml";
                if(CountArray.length>0){
                    getDetailPage(nexturl);
                }else{
                    //请求全部完成
                    logger.info("请求全部完成，共收录"+templateArray.length+"条记录");
                    callback(templateArray);
                }
            }else{
                logger.debug("当前请求: "+url +" 失败");
                let CountNumber = CountArray.shift();
                if(!(retryObj["url"] >= 3) ){
                    if(retryObj["url"]){
                        retryObj["url"] ++;
                    }else{
                        retryObj["url"] = 1;
                    }
                    CountArray.push(CountNumber);// 将失败的丢到队尾重试  超过3次则放弃
                }else{
                    logger.info("请求 "+url+" 失败超过3次 放弃重试  失败码:"+ response.statusCode);
                    if(CountArray.length>0){
                        let nextNumber = CountArray.shift();
                        let  nexturl = firsturl +"index_"+nextNumber+".shtml";
                        getDetailPage(nexturl);
                    }else{
                        //请求全部完成
                        logger.info("请求全部完成，共收录"+templateArray.length+"条记录");
                        callback(templateArray);
                    }

                }

            }
        });

    };


};


