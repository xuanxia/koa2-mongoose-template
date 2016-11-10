const request = require('request');
const cheerio = require('cheerio');


let templateArray = []; //使用数组作为缓存
/*
* 获取总页数
*
* */
const  getAllCountNumber =async()=>{
    const indexurl = "http://www.cssmoban.com/";
    await request(indexurl,function(error,response,body){
        if(!error && response.statusCode == 200){
            $ = cheerio.load(body);
            CountNumber = parseInt($("#pagelist span").text().replace(/总共/,"").replace(/页/,""));
            return null;
        }else{
            return null;
        }
    });

    return CountNumber;
};

/*
* 获取详情页面地址
*
* */
let firsturl = "http://www.cssmoban.com/cssthemes/";
let CountNumber = getAllCountNumber();
const getDetailPage = async(url)=>{
    console.log(CountNumber);
    await request(url,function(error,response,body){
        if(!error && response.statusCode == 200){
            $ = cheerio.load(body);
            $(".thumbItem").eq(0).find("li").each(function(index,item){
                const liDom = $(item);
                let temp = {};
                temp["detialUrl"] = "http://www.cssmoban.com" + liDom.find("a").eq(0).attr("href");
                temp["status"] = false;
                templateArray.push(temp);
            });
        }else{
            return null;
        }
    });
    CountNumber -- ;
    firsturl +="index_"+CountNumber+".shtml";
    if(CountNumber>0){
        getDetailPage();
    }else{
        console.log(templateArray.length);
    }
};
getDetailPage(firsturl);




