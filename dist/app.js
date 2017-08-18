'use strict';

var path = require('path');

var debug = require('debug')('casual-say');
var koa = require('koa');
//配置文件
var config = require('./config/config.es6');

var app = new koa();
var http = require('http').Server(app.callback());
var io = require('socket.io')(http);

var ioHandler = require('./main/io/index.es6');
ioHandler.index(io);

var staticHash = require('./staticHash/index.es6');
var hashPath = path.resolve(__dirname, '..', 'hash/assets.json');
var assetsJson = staticHash.readSync(hashPath);
global.assetsJson = config.assetsJson = JSON.parse(assetsJson);

app.use( /*#__PURE__*/regeneratorRuntime.mark(function _callee(next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    //config 注入中间件，方便调用配置信息
                    if (!this.config) {
                        this.config = config;
                    }
                    _context.next = 3;
                    return next;

                case 3:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
}));

//log记录
var Logger = require('mini-logger');
var logger = Logger({
    dir: config.logDir,
    format: 'YYYY-MM-DD-[{category}][.log]'
});

//router use : this.logger.error(new Error(''))
app.context.logger = logger;

var onerror = require('koa-onerror');
onerror(app);

//xtemplate对koa的适配
var xtplApp = require('xtpl/lib/koa');
//xtemplate模板渲染
xtplApp(app, {
    //配置模板目录
    views: config.viewDir
});

var session = require('koa-session');
app.use(session(app));

//post body 解析
var bodyParser = require('koa-bodyparser');
app.use(bodyParser());
//数据校验
var validator = require('koa-validator');
app.use(validator());

var serve = require('koa-static');
var staticDir = config.staticDir;
app.use(serve(staticDir));

//路由
var router = require('koa-router')();

//应用路由
var appRouter = require('./router/index.es6');
appRouter(router);

app.use(router.routes()).use(router.allowedMethods());

//app.listen(config.port);
http.listen(config.port, function () {
    console.log('listening on 127.0.0.1:' + config.port);
});

module.exports = app;