var path = require('path');

module.exports = function (b, shims) {
    if (!shims) {
        return;
    }
    if (typeof shims !== 'function') {
        shims = (function (shims) {
            return function (id) {
                return shims[id];
            };
        }(shims));
    }
    b._bresolve = (function (resolve) {
        return function (id, parent, cb) {
            var shimed = id;
            if (id[0] === '.') {
                var base = parent.basedir ||
                    (parent.filename && path.dirname(parent.filename)) ||
                    process.cwd();
                shimed = path.resolve(base, id);
            }
            resolve(shims(shimed) || id, parent, cb);
        };
    }(b._bresolve));
};
