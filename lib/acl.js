
var util = require('util');
var co = require('co');

var Acl = function(acl) {
    Acl.acl = acl;
    return Acl.acl;
};
Acl.options = {};

Acl.middleware = function(numPathComponents, userId, actions) {
    return function* (next) {
        var _numPathComponents = numPathComponents;
        if (!_numPathComponents) {
            _numPathComponents = this.request.path.split('/').length - 1;
        }
        var _userId = userId;
        if (!_userId) {
            _userId = Acl.options.user.call(this);
        }
        if (typeof _userId === 'function') {
            _userId = _userId.bind(this);
        }
        var _actions = actions;
        if (!_actions) {
            _actions = this.request.method.toLowerCase();
        }
        var ctx = this;
        yield new Promise(function (resolve, reject) {
            var middleware = Acl.acl.middleware(_numPathComponents, _userId, _actions);
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
    };
};

Acl.onGetUser = function(user) {
    Acl.options.user = user;
};

module.exports = Acl;
