module.exports = {
    index: function*(){
        console.log('render index');
        yield this.render('index',{"title":"casual-say", "hash": global.assetsJson.index});
    },
    game: function*(){
        console.log('render game');
        yield this.render('game',{"title":"game", "hash": global.assetsJson.game});
    },
    main: function*(){
        console.log('render notfound');
        yield this.render('notfound',{"title":"casual-say", "hash": global.assetsJson.notfound});
    }
}