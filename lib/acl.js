
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
    ACL.options = options
}

ACL.user = (numPathComponents, userIds) => {
    return function* (next) {
        yield next;
    }
}

ACL.role = (numPathComponents, roles) => {
    return function* (next) {
        yield next;
    }
}

ACL.middleware = options => {
    return function* (next) {
        yield next;
    }
}

module.exports = ACL;
