module.exports = {
    pageUrlIsReady:   Boolean,  //获取详情地址是否完成,
    pageUrlQueryReady:   Boolean,  //获取详情地址是否完成,
    pageCount     :   Number,   //已获取页面总数
    pageUrlCount  :   Number,   //已搜索详情地址数量
    pageUrlDbCount:   Number,   //已保存详情地址数量
    pageUrlDbExistCount:   Number,   //已存在地址数量
    pageUrlFailCount   :   Number,   //保存时失败的数量
    pageUrlQueryTime   :   Number,  //搜索页面花费时长
    pageUrlSaveTime    :   Number,  //保存页面花费时长
    updateTime    :   Date
};