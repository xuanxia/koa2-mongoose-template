const dataStructure = require('../comm_unit/data_structure');
const ResultData = dataStructure.ResultData;
const PageData = dataStructure.PageData;

const resultData = new ResultData();
const pageData = new PageData();
    pageData.setDatalist([{id:1},{id:2},{id:3}]);
    pageData.setModel(10,24,3189,"","");
    resultData.setMessage("查询成功");
    resultData.setStatus(1);
    resultData.setData(pageData);
    console.log(resultData);



