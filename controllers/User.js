var db = require('../redis-db/db');
var users = require('../models/User');


exports.list = function (req, res, next) {
    doctors.list({
        direction: 'desc'
    }, function (err, users) {
        console.log(users);
        if (!err) {
            return users;
        } else {
            return console.log(err);
        }
    });

};

exports.add = function (req, res, next) {
    console.log("POST: ");
    console.log(req.body);
    doctors.create(
        { username: this.params.username, email: this.params.email, password: this.params.password },
        function (err, user) {
            if (user) {
                console.log({ ret: true, msg: '恭喜您成功注册', data: user });
                return { ret: true, msg: '恭喜您成功注册', data: user };
            }
            else {
                console.log({ ret: false, msg: '请修改医生昵称', data: err });
                return { ret: false, msg: '请修改医生昵称', data: err };
            }
        });
};

exports.doctor = function (req, res, next) {
    doctors.get({ id: this.params.id }
    , function (err, user) {
        if (!err) {
            console.log(user);
            return user;
        }
        else {
            return console.log(err);
        }

    });
    
    return;
};

exports.update = function (req, res, next) {
    doctors.update({
        id: this.params.id,
        username: this.params.username,
        email: this.params.email,
        password: this.params.password
    }, function (err, user) {
        return console.log(user);
        if (!err) {
            console.log("updated");
        } else {
            console.log(err);
        }
        return user;

    });
};

exports.delete = function (req, res, next) {
    doctors.remove(
        {
            id: this.params.id
        }
    , function (err, user) {
            if (!err) {
                console.log("removed");
                return "";
            } else {
                console.log(err);
            }
            return console.log(user);
        });

};

exports.login = function (req, res, next) {
    doctors.get({ username: this.params.username, password: this.params.password }
        , function (err, user) {
        if (!err) {
            console.log(user);
            if (user) {
                console.log({ ret: true, msg: '成功登陆', data: user });
                return { ret: true, msg: '成功登陆', data: user };

            }
            else {
                console.log({ ret: false, msg: '请检查用户名和密码' });
                return { ret: false, msg: '请检查用户名和密码' };
            }
        }
    });
};

exports.usernameIsExist = function (req, res, next) {
    doctors.get({ username: this.params.username }
        , function (err, user) {
        if (!err) {
            console.log(user);
            if (user) {
                console.log({ ret: true, msg: '用户名已经存在，请修改用户名！', data: user });
                return { ret: true, msg: '用户名已经存在，请修改用户名！', data: user };

            }
            else {
                console.log({ ret: false, msg: '可以使用此用户名称' });
                return { ret: false, msg: '可以使用此用户名称' };
            }
        }
    });


}