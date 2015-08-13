# koa-acl

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

### ACL middleware for koa.

#### Differences with [acl](https://github.com/optimalbits/node_acl)
* Add `Acl.onGetUser` for custom user getter.
* Override `Acl#middleware` to adapt koa.

#### Examples

##### Setting default user getter.
```js
var Acl = require('koa-acl');
Acl.onGetUser(function() {
    return this.state.user._id;
});
```

##### Middleware(see [Acl#middleware](https://github.com/optimalbits/node_acl#middleware))
```js
var Acl = require('koa-acl');
var acl = new Acl(new Acl.memoryBackend());
route.delete('/api/users/:user', acl.middleware(2));
```


# Licences

[MIT](LICENSE)
