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
ACL({
    //user getter
    user: function(ctx) {
        return ctx.state.user._id;
    },
    //backend getter
    backend: new Acl.memoryBackend()
})
```


#### Middleware for users or roles.
```js
var Acl = require('koa-acl');
route.delete(
    '/api/users/:user',
    Acl.user(numPathComponents, userIds),
    Acl.role(numPathComponents, roleNames),
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
options.backend {Object|Function|Promise} backend getter.

```
----------

#### Acl.user(numPathComponents[, userIds])

Authorizing by any user in users.

__Arguments__
```js
numPathComponents   {Number}    number of components in the url to be considered part of the resource name (defaults to number of components in the full url).
userIds {Array|String|Function}   user IDs (defaults to options.user).
```
----------

#### Acl.role(numPathComponents[,roles])

Authorizing by any role in roles.

__Arguments__

```js
numPathComponents (see Acl.user)
roles   {Array|String|Function} roles.
```
----------

#### Acl.middleware(options)

Authorizing by any user in users or role in roles.

__Arguments__

```js
options.users   {Object|Number}    a map of user id to number of components in the url.
options.roles   {Object|Array}    a map of role name to number of components in the url.
```


## Tests
```js
npm test
```



## Licences

[MIT](LICENSE)
