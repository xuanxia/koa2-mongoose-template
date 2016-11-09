class ResultData{
    constructor(status,data,message){
        this.status = status;
        this.data = data;
        this.message = message;
    }
    setStatus(status){
        this.status = status;
    }
    setData(data){
        this.data = data;
    }
    setMessage(message){
        this.message = message;
    }
}

class ErrData{
    constructor(type,code,message){
        this.type = type;
        this.code = code;
        this.message = message;
    }
    setType(type){
        this.type = type;
    }
    setCode(code){
        this.code = code;
    }
    setMessage(message){
        this.message = message;
    }
}

class PageData{
    constructor(datalist,model){
        this.datalist = datalist;
        this.model = model;
    }
    setDatalist(datalist){
        this.datalist = datalist;
    }
    setModel(page,pagesize,total,sortName,sortType,keyword){
        this.model = new Model(page,pagesize,total,sortName,sortType,keyword);
    }
}

class Model{
    constructor(page,pagesize,total,sortName,sortType,keyword){
        this.page = page;
        this.pagesize = pagesize;
        this.total = total;
        this.sortName = sortName;
        this.sortType = sortType;
        this.keyword = keyword;
        this.pagetotal = this.getPagetotal(total,pagesize);
        this.nextpage = this.getNextpage(page);
        this.prepage = this.getPrepage(page);
        this.pageNum = this.getPageNum();
    }

    getPagetotal(total,pagesize){
        return Math.ceil(total/pagesize);
    }
    getNextpage(page){
       if(page < this.pagetotal){
           return page+1;
       }else{
           return page;
       }
    }
    getPrepage(page){
        if(page===1){
            return 1
        }else{
            return page - 1;
        }
    }
    getPageNum(){
        let pagestartend = {};
        if(this.pagetotal<=10){
            pagestartend["start"] = 1;
            pagestartend["end"] = this.pagetotal;
        }else{
            if(this.pagetotal - this.page <5){
                pagestartend["start"] = this.pagetotal - 9;
                pagestartend["end"] = this.pagetotal;
            }else{
                if(this.page>=5){
                    pagestartend["start"] = this.page -4;
                    pagestartend["end"] = this.page + 5;
                }else{
                    pagestartend["start"] = 1;
                    pagestartend["end"] = 10;
                }

            }
        }
        let result = [];
        for(let i = pagestartend["start"];i<=pagestartend["end"];i++){
            result.push(i);
        }
        return result;
    }

}


module.exports.ResultData = ResultData;
module.exports.ErrData = ErrData;
module.exports.PageData = PageData;