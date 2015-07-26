var db = require('../redis-db/db');
var users = db.get("users");
users.property('id', { identifier: true });
users.property('username', { unique: true });
users.property('email', { index: true, email: true });
users.property('password', {});
exports.users = users;