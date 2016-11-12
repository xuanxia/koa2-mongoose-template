const logger = require('../comm_unit/log4js.js');

const db = require('../comm_unit/dbconn.js');
const PageUrlVo = require('../dbm/Pageurl.js');
const PageUrlModel = db.model("pageurl", {
    detailUrl  :    String,
    /* createTime :    Date,
     updateTime :    Date,*/
    status     :    Boolean
});

let pageUrl = new  PageUrlModel({ detailUrl: 'http://www.cssmoban.comundefined', status: false });

pageUrl.save(function(err,result){
    logger.debug(result);
    if(err || !result.status){
        logger.error("biz_pageurl.js--save"+err);

    }else{
        logger.debug(result);

    }

});


/*const db = require('../comm_unit/dbconn.js');
var Cat = db.model('Cat', { name: String });

var kitty = new Cat({ name: 'jhgsjdfghj' });
kitty.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('meow');
    }
});*/
