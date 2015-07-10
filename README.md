# resolve-shimify
Custom resolve for [browserify](http://npmjs.org/package/browserify).

Here are two typical cases where this plugin comes in handy:

1. Make `require('react')` equal to `require('react/dist/react.js')`, even for react components installed in `node_modules`, most of them not specifying a [browser-filed](https://github.com/substack/browserify-handbook#browser-field) in `package.json`
2. Make symlinks resolved to their real paths, so that they can be treated as local packages and [transforms](https://github.com/substack/browserify-handbook#browserifytransform-field) from `package.json` may be applicable. You can use [realpathify](http://npmjs.org/package/realpathify).

This plugin hacks a private property of the browserify instance (`b._bresolve`).
It does not transform file contents, but makes twists to the behaviour of resolving the module paths.
So it is much more faster than applying a global transform.

## Usage

```javascript
var browserify = require('browserify');
var shimify = require('resolve-shimify');

browserify(opts)
.plugin(shimify, { react: 'react/dist/react.js' })
;
```

## b.plugin(shimify, shimFn)

### shimFn(module)

Type: `Function`

Return: `String`, `undefined`

This function is called before resolving, to transform `module` to some other value to resolve.

If the returned value is `falsy`, the original `module` value will be used.


## b.plugin(shimify, shims)

### shims

Type: `Object`

A map for transforming `module`.

Each key must be either an absolute path or a module path.
