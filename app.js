var koa = require('koa')
var app = koa();
var path = require('path');
var bodyparser = require('koa-bodyparser');
var router = require('koa-router')();
var routes = require('./routes/routes.js');

var staticServer  = require('koa-static');
var render = require('koa-swig');
app.use(staticServer(__dirname + '/Content'));
app.use(bodyparser());
app.context.render = render({
    root: path.join(__dirname, 'views'),
    ext: 'html',
    //locals: locals,
    // filters: filters

});

routes(router);
app.use(router.routes())
    .use(router.allowedMethods());
if (module.parent) {
    module.exports = app.callback();
} else {
    app.listen(2333);
}
