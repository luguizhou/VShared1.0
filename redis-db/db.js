
var ron = require('ron');
// Client connection
var client = ron({
    port: 6379,
    host: '127.0.0.1',
    name: 'auth',
});
// Schema definition

// Schema definition
var users = client.get('users');
users.property('id', {identifier: true});
users.property('username', {unique: true});
users.property('email', {index: true, email: true});
users.property('name', {});

module.exports = client;

//data remove
/*
doctors.remove(
        {
            id:4
        }
    , function(err, user) {
        if (!err) {
            console.log("removed");
        } else {
            console.log(err);
        }
    });

 */
// data update
/*
doctors.update({
id:5,  
username: null,

}, function(err, user) {
  return console.log(user);
});
*/
//get singe record
/*
doctors.get({
  id:3
}, function(err, user) {
  return console.log("This is " + JSON.stringify(user));
});
*/

//list all data
/*
Users.all(function(err,user) {
 console.log(JSON.stringify(user)+"\n");
});
*/

/* 列出用户清单
Users.list({
  direction: 'desc'
}, function(err, users) {
  return console.log(users);
});
*/
// Record manipulation
/*
Users.create(
    {username: 'ron22', email: 'ron@domain.com'},
    function(err, user){
        if(!user) user={};
        console.log(err, user);
    }
)
*/
