var expect = require('chai').expect;
var ACL = require('../lib/acl');
var Acl = require('acl');
var request = require('supertest-koa-agent');
var koa = require('koa');

var acl = ACL(new Acl(new Acl.memoryBackend()));

ACL.onGetUser(function() {
    return this.state.user.id;
});

describe('acl middleware', function() {
    describe('with default user getter', function() {
        var app = koa();
        app.use(function* (next) {
            this.state.user = {id: this.query.id};
            yield next;
        });
        app.use(ACL.middleware());
        app.use(function* (next){
            this.body = 'ok';
        });

        before(function(done) {
            acl.allow('admin', '/api/users', 'post', done);
        });
        before(function(done) {
            acl.addUserRoles('admin', 'admin', done);
        });
        before(function(done) {
            acl.isAllowed('admin', '/api/users', 'post', function(err, allowed) {
                console.log(err, allowed);
                done(err);
            });
        });

        describe('and un-authorized user', function() {
            it('should be fail', function(done) {
                request(app)
                    .post('/api/users?id=guest')
                    .expect(403)
                    .end(done);
            });
        });

        describe('and authorized user', function() {
            it('should be success', function(done) {
                request(app)
                    .post('/api/users?id=admin')
                    .expect(200, 'ok')
                    .end(done);
            });
        });
    });

    describe('with custom user getter', function() {
        describe('and un-authorized user', function() {
            it('should be fail', function() {

            });
        });

        describe('and authorized user', function() {
            it('should be success', function() {

            });
        });
    });
});
