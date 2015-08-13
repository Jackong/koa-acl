var expect = require('chai').expect;
var Acl = require('../lib/acl');
var request = require('supertest-koa-agent');
var koa = require('koa');

var acl = new Acl(new Acl.memoryBackend());

Acl.onGetUser(function() {
    return this.state.user.id;
});

describe('acl middleware', function() {

    before(function(done) {
        acl.allow('admin', '/api/users', 'post', done);
    });
    before(function(done) {
        acl.addUserRoles('admin', 'admin', done);
    });

    describe('for resource', function() {
        var app = koa();
        app.use(function* (next) {
            this.state.user = {id: this.query.id};
            yield next;
        });
        app.use(acl.middleware(2));
        app.use(function* (next){
            this.body = 'ok';
        });

        it('should be fail if unallowed', function(done) {
            request(app)
                .post('/api?id=admin')
                .expect(403)
                .end(done);
        });

        it('should be ok if allowed', function(done) {
            request(app)
                .post('/api/users/11?id=admin')
                .expect(200)
                .end(done);
        });
    });

    describe('for actions', function() {
        var app = koa();
        app.use(function* (next) {
            this.state.user = {id: this.query.id};
            yield next;
        });
        app.use(acl.middleware(2));
        app.use(function* (next){
            this.body = 'ok';
        });

        it('should be fail if unallowed', function(done) {
            request(app)
                .put('/api/users?id=admin')
                .expect(403)
                .end(done);
        });

        it('should be ok if allowed', function(done) {
            request(app)
                .post('/api/users?id=admin')
                .expect(200)
                .end(done);
        });
    });

    describe('with default user getter', function() {
        var app = koa();
        app.use(function* (next) {
            this.state.user = {id: this.query.id};
            yield next;
        });
        app.use(acl.middleware());
        app.use(function* (next){
            this.body = 'ok';
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
        var app = koa();
        app.use(function* (next) {
            this.state.user = {id: this.query.id};
            yield next;
        });
        app.use(acl.middleware(2, function() {
            this.state.user = {id: this.query.cid};
        }));
        app.use(function* (next){
            this.body = 'ok';
        });
        describe('and un-authorized user', function() {
            it('should be fail', function(done) {
                request(app)
                    .post('/api/users?id=admin&cid=guest')
                    .expect(403)
                    .end(done);
            });
        });

        describe('and authorized user', function() {
            it('should be success', function(done) {
                request(app)
                    .post('/api/users?id=guest&cid=admin')
                    .expect(200, 'ok')
                    .end(done);
            });
        });
    });
});
