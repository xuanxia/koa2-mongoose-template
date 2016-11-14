const config = require('../config.js');
var fn_admin = async(ctx,next)=>{
        ctx.render('admin.html',{title:"admin"});
};




module.exports = {
    'GET /admin': fn_admin
};