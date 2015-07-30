var parser = require("co-body");
//连接 redis 服务器
var dbCo = require('../redis-db/db');
module.exports = routes;
function routes(router) {
    router.get('/', function*(next) {
        yield this.render("pc/home");
    });
    router.get('/login', function*(next) {
        yield this.render("login");
    });
    router.get('/register', function*(next) {
        yield this.render("register");
    });
    router.post('/login', function*(next) {
       this.body = {"username":this.params.username};
    });
    router.get('/admin', function*(next) {
        yield this.render("admin/index");
    });



}
