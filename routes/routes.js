/*//var blog = require('../controllers/blog.js');
var db = require('../redis-db/db');
var doctors = require('../models/User');*/
var parser = require("co-body");
//连接 redis 服务器
var dbCo = require('../redis-db/db');
module.exports = routes;
function routes(router) {
    router.get('/', function*(next) {
        yield this.render('home', {
            user: {
                name: 'fundon',
                email: 'cfddream@gmail.com'
            }
        });
    });
    router.get('/admin/:id/:test', function*(next) {
        //debugger;
        console.log(this.params);
        console.log();
        yield dbCo.hmset("hosts", "mjr", "1", "another", "23", "home", "1234","params",JSON.stringify( this.params));
        this.body =yield dbCo.hgetall("hosts");
        //this.body = JSON.parse(this.body);
            console.log(this.body.params);
    });
}
