//var blog = require('../controllers/blog.js');
//var users = require('../controllers/users.js');
var send = require("koa-send");
module.exports = routes;
function routes(router) {
    router.get('/', function*(next) {
        yield this.render("pc/home");
    });
    router.get('/login', function*(next) {
        yield this.render("login");
    });
    router.post('/login', function*(next) {
       this.body = {"username":this.params.username};
    });
    router.post('/admin', function*(next) {
        yield this.render("admin/index");
    });



}