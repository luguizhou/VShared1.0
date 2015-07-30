var koa = require('koa'),
path = require('path'),
router = require('koa-router')(),
routes = require('./routes/routes.js'),
staticServer  = require('koa-static'),
bodyparser = require('koa-bodyparser'),
render = require('koa-swig');
var app = koa();
console.log(__dirname);
app.use(staticServer(__dirname + '/public'));
app.use(bodyparser());
app.context.render = render({
    root: path.join(__dirname, 'views'),
    ext: 'html',
});

routes(router);
app.use(router.routes());
if (module.parent) {
    module.exports = app.callback();
} else {
    app.listen(2333);
}
