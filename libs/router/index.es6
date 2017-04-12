var controller = require('../controller/index.es6');
module.exports = function(app){
    //首页
    app.get('/',controller.index);

    app.get('/main',controller.main);
};