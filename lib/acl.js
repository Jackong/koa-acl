
var util = require('util');
var co = require('co');
var Acl = require('acl');

var ACL = function() {
    Acl.apply(this, arguments);
};

util.inherits(ACL, Acl);

ACL.options = {};

ACL.onGetUser = function(user) {
    ACL.options.user = user;
};

ACL.prototype.middleware = function(numPathComponents, userId, actions) {
    var _self = this;
    return function* (next) {
        var _numPathComponents = numPathComponents;
        if (!_numPathComponents) {
            _numPathComponents = this.request.path.split('/').length - 1;
        }
        var _userId = userId;
        if (typeof _userId === 'function') {
            _userId = _userId.call(this);
        }
        if (!_userId) {
            _userId = ACL.options.user.call(this);
        }
        var _actions = actions;
        if (!_actions) {
            _actions = this.request.method.toLowerCase();
        }
        var ctx = this;
        yield new Promise(function (resolve, reject) {
            var middleware = Acl.prototype.middleware.call(_self, _numPathComponents, _userId, _actions);
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



ACL.redisBackend = Acl.redisBackend;
ACL.memoryBackend = Acl.memoryBackend;
ACL.mongodbBackend = Acl.mongodbBackend;
module.exports = ACL;
