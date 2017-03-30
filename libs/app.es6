const path = require('path');

const debug = require('debug')('casual-say');
const koa = require('koa');
//配置文件
const config = require('./config/config.es6');

const app = new koa();
const http = require('http').Server(app.callback());
const io = require('socket.io')(http);

io.set('heartbeat interval', 60000);
io.set('heartbeat timeout', 5000);

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

const staticHash = require('./staticHash/index.es6');
const hashPath = path.resolve(__dirname, '..', 'hash/assets.json');
const assetsJson = staticHash.readSync(hashPath);
global.assetsJson = config.assetsJson = JSON.parse(assetsJson);

app.use(function *(next){
    //config 注入中间件，方便调用配置信息
    if(!this.config){
        this.config = config;
    }
    yield next;
});

//log记录
const Logger = require('mini-logger');
const logger = Logger({
    dir: config.logDir,
    format: 'YYYY-MM-DD-[{category}][.log]'
});

//router use : this.logger.error(new Error(''))
app.context.logger = logger;

const onerror = require('koa-onerror');
onerror(app);

//xtemplate对koa的适配
const xtplApp = require('xtpl/lib/koa');
//xtemplate模板渲染
xtplApp(app,{
    //配置模板目录
    views: config.viewDir
});


const session = require('koa-session');
app.use(session(app));


//post body 解析
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
//数据校验
const validator = require('koa-validator');
app.use(validator());

const serve = require('koa-static');
const staticDir = config.staticDir;
app.use(serve(staticDir));

//路由
const router = require('koa-router')();

//应用路由
const appRouter = require('./router/index.es6');
appRouter(router);

app
  .use(router.routes())
  .use(router.allowedMethods());

//app.listen(config.port);
http.listen(config.port, () => {
  console.log(`listening on 127.0.0.1:${config.port}`);
});

module.exports = app;