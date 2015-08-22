var users = require('../models/User.js');
exports.list = function* (params) {
    var result = yield users.list(params);
    return result;
};

exports.add = function *(params) {
    return yield users.create(params);
};

exports.get = function *(params) {
    return yield users.get({ id: params.id });
};

exports.update = function *(params) {
    return yield users.update(params);
};

exports.userremove = function *(params) {
    return yield users.userremove(params);
};

exports.login = function *(next) {
    return yield users.login(params);
};

exports.usernameIsExist = function *(req, res, next) {
    return yield users.usernameIsExist(params);
}