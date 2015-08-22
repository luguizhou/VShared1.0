var users = require('../models/User.js');
exports.list = function (next) {
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

exports.add = function *(params) {
    return yield users.create(params);
};

exports.get = function *(params) {
    return yield users.get({ id: params.id });;
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