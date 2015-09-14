var users = require('../controllers/UsersController.js');
var QrcodeUsers = require('../controllers/QrcodeUsersController.js');
var QrcodeTemplets = require('../controllers/QrcodeTempletsController.js');

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
       ///this.body = yield users.get(this.request.body);
        if(this.request.body.username=="lugz" &&this.request.body.password=="lugz"){
            yield users.add(this.request.body);
            this.body= {
                err: null,
                data: {
                    token: '80484decceb142dfaf5791c9cb9cd256',
                    username: "卢桂周",
                    uid: 1
                }
            }
        }else{
            this.body={err:"密码不正确",data:null};
        }
        console.log(this.body);
    });
    router.get('/getuser', function*(next) {
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
    router.post('/create/', function*(next) {
        this.body = yield users.add(this.request.body);
    });
   //后端管理菜单列表
   
   //后端管理二维码菜单
    router.get('/admin/topmenulist', function*(next) {
        this.body = {
            err: null,
            data: [
                {
                    id:1,
                    text: "页面模板管理",
                    menuurl:"qrcode/qcodetempletlist"
                },
                {
                    id:2,
                    text: "用户管理",
                    menuurl:"qrcode/qcodeuserlist"
                }
            ]
        }
    });

	//二维码模块
	router.get('/qrcode/users/qrcodeimg/:id', function*(next) {
		var qrCode = require('qrcode-npm');
		var qr = qrCode.qrcode(4, 'M');
		qr.addData('http://qrcode.vshared.top/qrcode/users/qrcodeuserpage/'+this.request.ctx.params.id);
		qr.make();
		this.body = qr.createImgTag(4);    // creates an <img> tag as text
		//qr.createTableTag(4);  // creates a <table> tag as text
	});

    //二维码图片
	router.get('/qrcode/users/qrcodeuserpage/:id', function*(next) {
        yield this.render("qrcode/qrcodePage");
	});
    router.get('/qrcode/users/templet/:id', function*(next) {
        this.body='<div>test'+this.request.ctx.params.id+'</div>';
    });


    //新增二维码用户
	router.post('/qrcode/users/add', function*(next) {
		this.body = yield QrcodeUsers.add(this.request.body);
	});
    //二维码用户列表
	router.get('/qrcode/users/list', function*(next) {
		this.body = yield QrcodeUsers.list(this.request.body);
	});
    //通过id获取二维码用户
	router.get('/qrcode/users/get', function*(next) {
		this.body = yield QrcodeUsers.get(this.request.body);
	});
    //更新二维码用户
	router.post('/qrcode/users/update', function*(next) {
		this.body = yield QrcodeUsers.update(this.request.body);
	});
    //删除二维码用户
	router.post('/qrcode/users/delete', function*(next) {
		this.body = yield QrcodeUsers.userremove(this.request.body);
	});
	
	    //新增二维码用户模板
	router.post('/qrcode/templets/add', function*(next) {
		this.body = yield QrcodeTemplets.add(this.request.body);
	});
    //二维码用户列表模板
	router.get('/qrcode/templets/list', function*(next) {
		this.body = yield QrcodeTemplets.list(this.request.body);
	});
    //通过id获取二维码用户模板
	router.get('/qrcode/templets/get', function*(next) {
		this.body = yield QrcodeTemplets.get(this.request.body);
	});
    //更新二维码用户模板
	router.post('/qrcode/templets/update', function*(next) {
		this.body = yield QrcodeTemplets.update(this.request.body);
	});
    //删除二维码用户模板
	router.post('/qrcode/templets/delete', function*(next) {
		this.body = yield QrcodeTemplets.userremove(this.request.body);
	});
}