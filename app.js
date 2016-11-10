let isProduction = false;
const logger = require('./comm_unit/log4js.js');
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

// 创建一个Koa对象表示web app本身:
const app = new Koa();

const nunjucks = require('nunjucks');



//把解析后的参数，绑定到ctx.request.body中
const bodyParser = require('koa-bodyparser');

/*
 * 自动扫描controller下的路由
 * */
const controller = require("./comm_unit/controller.js");



/*
* 中间件1 记录URL以及页面执行时间：
* */
app.use(async (ctx, next) => {
    logger.info(`Process ${ctx.request.method} ${ctx.request.url}`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

/*
* 中间件2 处理静态文件
*
* */
if (! isProduction) {
    let staticFiles = require('./comm_unit/static_files.js');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

/*
 * 中间件3 解析POST请求
 *
 * */
app.use(bodyParser());


/*
* 中间件4 负责给ctx加上render()来使用Nunjucks：
*
* */
const templating = require('./comm_unit/templating.js');
app.use(templating('view', {
    noCache: !isProduction,
    watch: !isProduction
}));
// add url-route:
/*
* 可以在请求路径中使用带变量的/hello/:name，变量可以通过ctx.params.name访问。
* */
/*
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});
*/

/*
*
* 中间件5 处理URL路由
* */
app.use(controller());

app.use(router.routes());

/*
*
* 中间件6 统一处理错误
*
* */

const dealErr = require('./comm_unit/deal_err.js');
app.use(dealErr());
// 在端口3000监听:
app.listen(3000);

logger.info('app started at port 3000');
