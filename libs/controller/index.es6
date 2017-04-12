module.exports = {
    index: function*(){
        console.log('render index');
        yield this.render('index',{"title":"casual-say", "hash": global.assetsJson.index});
    },
    main: function*(){
        console.log('render notfound');
        yield this.render('notfound',{"title":"casual-say", "hash": global.assetsJson.notfound});
    }
}