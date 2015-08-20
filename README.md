# ACL middleware for koa.

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![Gittip][gittip-image]][gittip-url]

[npm-image]: https://img.shields.io/npm/v/koa-acl.svg?style=flat-square
[npm-url]: https://npmjs.org/package/koa-acl
[travis-image]: https://travis-ci.org/Jackong/koa-acl.svg?branch=master
[travis-url]: https://travis-ci.org/Jackong/koa-acl
[david-image]: https://img.shields.io/david/Jackong/koa-acl.svg?style=flat-square
[david-url]: https://david-dm.org/Jackong/koa-acl
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.11-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[gittip-image]: https://img.shields.io/gratipay/Jackong.svg
[gittip-url]: https://gratipay.com/~Jackong

## Features

* More smart to adapt koa.

## Document

### Examples

#### Setting options.
```js
var ACL = require('koa-acl');
var Acl = require('acl');
app.use(
    ACL({
        //user getter
        user: function(ctx) {
            return ctx.state.user._id;
        },
        //backend getter
        backend: new Acl.memoryBackend()
    })
);
```


#### Middleware for users or roles.
```js
var ACL = require('koa-acl');
route.delete(
    '/api/users/:user',
    ACL.middleware(2),
    function* (next) {
        //do something...
    }
);
```

### Methods

#### Acl(options)
Configure options for Acl.

__Arguments__
```js
options.user    {Function} user ID getter.
options.backend {Object|Function} backend getter.

```
----------

#### Acl.middleware(numPathComponents[, userId, actions])

Authorizing by user.

__Arguments__
```js
numPathComponents   {Number}    number of components in the url to be considered part of the resource name (defaults to number of components in the full url).
userId {String|Function}   user ID (defaults to options.user).
actions {String|Array}    lowercase.
```
----------


## Tests
```js
npm test
```



## Licences

[MIT](LICENSE)
