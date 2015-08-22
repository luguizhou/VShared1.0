//var blog = require('../controllers/blog.js');
var users = require('../controllers/UsersController.js');
//var users = require('../models/User.js');
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
       this.body = yield users.add(this.request.body);
        console.log(this.body);
    });
    router.all('/getuser/:id', function*(next) {
        this.body = yield users.get(this.params);
        console.log(this.body);
    });
    router.post('/admin', function*(next) {
        yield this.render("admin/index");
    });
    router.get('/getuserlist/', function*(next) {
        this.body = yield users.list(this.request.body);
    });
    router.post('/userupdate/', function*(next) {
        this.body = yield users.update(this.request.body);
    });
    router.post('/userdelete/', function*(next) {
        this.body = yield users.userremove(this.request.body);
    });




}