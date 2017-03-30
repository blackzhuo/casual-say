module.exports = {
    index: function*(){
        yield this.render('index',{"title":"casual-say", "hash": global.assetsJson.index});
    }
}