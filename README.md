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
var Acl = require('koa-acl');
var app = require('koa')();

app.use(
    Acl({
        //user getter
        user: function(ctx) {
            return ctx.state.user._id;
        },
        //backend getter
        backend: function(ctx) {
            return new acl.memoryBackend();
        }
    })
);
```


#### Middleware for users or roles.
```js
var Acl = require('koa-acl');
route.delete(
    '/api/users/:user',
    Acl.user(userIds, numPathComponents),
    Acl.role(roleNames, numPathComponents),
    function* (next) {
        //do something...
    }
);
```

### Methods

#### Acl(options)
Configure options for Acl.

__options__
```js
user    {Function} user ID getter.
backend {Object|Function|Promise} backend getter.

```
----------

#### Acl.user([userIds[, numPathComponents]] | [numPathComponents[, userIds]])

Authorizing by users.

__Arguments__
```js
userIds {Array|String|Number}   user IDs (defaults to options.user).
numPathComponents   {Number}    number of components in the url to be considered part of the resource name (defaults to number of components in the full url).
```
----------

#### Acl.role(roles[, numPathComponents])

Authorizing by roles.

__Arguments__

```js
roles   {Array|String} roles.
numPathComponents (see Acl.user)
```

## Tests
```js
npm test
```



## Licences

[MIT](LICENSE)
