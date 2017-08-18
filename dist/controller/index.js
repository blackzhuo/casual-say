'use strict';

module.exports = {
    index: /*#__PURE__*/regeneratorRuntime.mark(function index() {
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
    game: /*#__PURE__*/regeneratorRuntime.mark(function game() {
        return regeneratorRuntime.wrap(function game$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        console.log('render game');
                        _context2.next = 3;
                        return this.render('game', { "title": "game", "hash": global.assetsJson.game });

                    case 3:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, game, this);
    }),
    main: /*#__PURE__*/regeneratorRuntime.mark(function main() {
        return regeneratorRuntime.wrap(function main$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        console.log('render notfound');
                        _context3.next = 3;
                        return this.render('notfound', { "title": "casual-say", "hash": global.assetsJson.notfound });

                    case 3:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, main, this);
    })
};