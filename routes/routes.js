//var blog = require('../controllers/blog.js');
var users = require('../controllers/users.js');
module.exports = routes;
function routes(router) {
    router.get('/', function*(next) {
        yield this.body=users.list
    });
    router.get('/index', function*(next) {
        this.body = { test: "sfsdfa" };
        this.params;
        yield next;
    });

   
}

/*
 * 
 *   router.get('/', function*(next) {
        yield this.render('home', {
            user: {
                name: 'fundon',
                email: 'cfddream@gmail.com'
            }
        });
    });
    router.get('/index', function*(next) {
        this.body = {test:"sfsdfa"};
        yield next;
    });
 * */