var expect = require('chai').expect;
var ACL = require('../lib/acl');
var request = require('supertest-koa-agent');
var koa = require('koa');
var Acl = require('acl');

var backend = new Acl.memoryBackend();

ACL({
    user: ctx => {
        return ctx.state.user._id
    },
    backend: ctx => {
        return Promise.resolve(backend)
    }
})

var acl = new Acl(backend)

describe('middleware', () => {
    before(function(done) {
        acl.allow('admin', '/api/users', 'post', done);
    });
    before(function(done) {
        acl.addUserRoles('jackong', 'admin', done);
    });
    var app = koa();
    app.use(function* (next) {
        this.state.user = {_id: this.query.id};
        yield next;
    });
    app.use(ACL.middleware({
        users: 2,
        roles: {
            admin: 2
        }
    }));
    app.use(function* (next){
        this.body = 'ok';
    });

    describe('user', () => {
        describe('with short path', () => {
            it('should be fail', function(done) {
                request(app)
                    .post('/api?id=jackong')
                    .expect(403)
                    .end(done);
            });
        })

        describe('with long path', () => {
            it('should be ok', function(done) {
                request(app)
                    .post('/api/users/11?id=jackong')
                    .expect(200)
                    .end(done);
            });
        })

        describe('with guest user', () => {
            it('should be fail', done => {
                request(app)
                    .post('/api/users/11?id=guest')
                    .expect(403)
                    .end(done)
            })
        })
    });

    describe('role', () => {

        describe('with short path', () => {
            it('should be fail', function(done) {
                request(app)
                    .post('/api?id=jackong')
                    .expect(403)
                    .end(done);
            });
        })

        describe('with long path', () => {
            it('should be ok', function(done) {
                request(app)
                    .post('/api/users/11?id=jackong')
                    .expect(200)
                    .end(done);
            });
        })

        describe('with guest user', () => {
            it('should be fail', done => {
                request(app)
                    .post('/api/users/11?id=guest')
                    .expect(403)
                    .end(done)
            })
        })
    })
})
