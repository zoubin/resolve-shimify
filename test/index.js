var test = require('tape');
var shimify = require('..');
var path = require('path');
var browserify = require('browserify');
var sink = require('sink-transform');

var fixtures = path.resolve.bind(path, __dirname, 'fixtures');

test('shim function', function(t) {
    t.plan(1);
    var originalBundle = browserify(fixtures('require-original'))
        .plugin(shimify, function (id) {
            if (id === 'react') {
                id = 'react/dist/react.js';
            }
            return id;
        })
        .bundle()
        ;
    var distBundle = browserify(fixtures('require-dist'))
        .bundle()
        ;
    distBundle.pipe(sink.str(function (body) {
        originalBundle.pipe(sink.str(function (b) {
            t.equal(
                body.replace(/react\/dist\/react.js/g, 'react'),
                b
            )
        }));
    }));
})

test('shim object', function(t) {
    t.plan(1);
    var originalBundle = browserify(fixtures('require-original'))
        .plugin(shimify, { react: 'react/dist/react.js' })
        .bundle()
        ;
    var distBundle = browserify(fixtures('require-dist'))
        .bundle()
        ;
    distBundle.pipe(sink.str(function (body) {
        originalBundle.pipe(sink.str(function (b) {
            t.equal(
                body.replace(/react\/dist\/react.js/g, 'react'),
                b
            )
        }));
    }));
})
