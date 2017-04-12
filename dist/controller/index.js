'use strict';

module.exports = {
    index: regeneratorRuntime.mark(function index() {
        return regeneratorRuntime.wrap(function index$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log('render index');
                        _context.next = 3;
                        return this.render('index', { "title": "casual-say", "hash": global.assetsJson.index });

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, index, this);
    }),
    main: regeneratorRuntime.mark(function main() {
        return regeneratorRuntime.wrap(function main$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        console.log('render notfound');
                        _context2.next = 3;
                        return this.render('notfound', { "title": "casual-say", "hash": global.assetsJson.notfound });

                    case 3:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, main, this);
    })
};