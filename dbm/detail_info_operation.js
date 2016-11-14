module.exports = {
    detailInfoIsReady:   Boolean,  //获取详情地址是否完成,
    pageCount        :   Number,   //待处理页面总数量
    detailInfoSuccessCount  :   Number,   //已经获取详情并入库成功数量
    detailInfoQueryFailsCount  :   Number,   //获取详情页面失败数量
    detailInfoSaveFailsCount  :   Number,   //入库失败数量
    detailInfoQueryAndSaveTime   :   Number,  //保存花费总时长
    updateTime    :   Date
};