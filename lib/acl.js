
var util = require('util');
var co = require('co');
var Acl = require('acl');

var ACL = options => {
    if (!options.user) {
        throw new Error('user getter required')
    }
    if (!options.backend) {
        throw new Error('backend getter required')
    }
    ACL.options = options;
    return function* (next) {
        var backend = ACL.options.backend;
        if (ACL.options.backend instanceof Function) {
            backend = yield ACL.options.backend(this);
        }
        this.acl = new Acl(backend)
        yield next;
    }
}

ACL.middleware = (numPathComponents, userId, actions) => {
    return function* (next) {
        var _numPathComponents = !numPathComponents ? this.request.path.split('/').length - 1 : numPathComponents;
        var _userId = userId;
        if (typeof _userId === 'function') {
            _userId = _userId(this);
        }
        if (!_userId) {
            _userId = ACL.options.user(this);
        }
        var _actions = actions;
        if (!_actions) {
            _actions = this.request.method.toLowerCase();
        }
        var ctx = this;
        yield new Promise(function (resolve, reject) {
            var middleware = ctx.acl.middleware.call(ctx.acl, _numPathComponents, _userId, _actions);
            middleware(ctx.request, ctx.response, function(err) {
                if(err) {
                    return reject(err);
                }
                resolve();
            });
        })
        .then(co.wrap(function* () {
            yield next;
        }))
        .catch(co.wrap(function* (err) {
            ctx.throw(err.errorCode, err.msg);
        }));
    }
}

module.exports = ACL;
