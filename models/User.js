
var db = require('../redis-db/db');
var doctors = db.get('doctors');
doctors.property('id', {identifier: true});
doctors.property('username', {unique: true});
doctors.property('email', {index: true, email: true});
doctors.property('password', {});



exports.create = function*(params){
    return yield new Promise(function(resolve){
         doctors.create(
            {username: params.username, email: params.email,password:params.password},
             function(err, data){
                 var result = {err:err,data:data};
                 resolve(result);
             });
    });
};
exports.get = function*(params){
    return yield new Promise(function(resolve){
        doctors.get({id:params.id}, function(err, data){
            var result = {err:err,data:data};
            resolve(result);
        })
    });
}
exports.list = function*(params) {
    params.direction=params.direction ||"desc";
    return yield new Promise(function(resolve){
        doctors.list(params, function(err, data){
            var result = {err:err,data:data};
            resolve(result);
        })
    });
};

exports.update=function*(params){
    return yield new Promise(function(resolve){
        doctors.update({
            id:params.id,
            username: params.username,
            email: params.email,
            password:params.password
        }, function(err, data){
            var result = {err:err,data:data};
            resolve(result);
        });
    });
};

exports.userremove=function*(params){
    return yield new Promise(function(resolve){
        doctors.remove({
            id: params.id
        }, function(err, data){
            var result = {err:err,data:data};
            console.log(result);
            resolve(result);
        });
    });
};

exports.login=function*(params){
    return yield new Promise(function(resolve){
        doctors.get({username:params.username, password:params.password}
        , function(err, data){
                var result = {err:err,data:data};
                resolve(result);
            });
    });
};

exports.usernameIsExist=function* (params){
    return yield new Promise(function(resolve){
    doctors.get({username:params.username}
        ,function(err, data){
            var result = {err:err,data:data};
            resolve(result);
        });
    });
}