module.exports = {
    mongodb:{
        host:"120.27.125.78",
        port:"27017",
        dataBaseName:"template",
        options :{
            db: { native_parser: true },
            server: { poolSize: 5 },
        }
    },
    log4js:{
        appenders: [
            { type: "console" },
            {
                "type": "file",
                "absolute": true,
                "filename": "C:/D/logs/template.log",
                "maxLogSize": 20480,
                "backups": 10,
                "category": "debug"
            }
        ],
        replaceConsole: true
    },
    //这些信息会传递到每一个页面
    baseInfo:{
        version:"1.0.0",
        qiniuHost:"http://ofqujgtgd.bkt.clouddn.com",
        preViewHost:"http://120.27.125.78/"
    }
};
