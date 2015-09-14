var koa = require('koa'),
path = require('path'),
router = require('koa-router')(),
routes = require('./routes/routes.js'),
staticServer  = require('koa-static'),
render = require('koa-swig');
var bodyParser = require('koa-bodyparser');
var app = koa();
app.use(bodyParser());
app.use(staticServer(__dirname + '/public'));
app.use(require('koa-redisy'));
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