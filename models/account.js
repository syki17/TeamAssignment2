const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passport = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String,
    email: String,
    role: String,
});

Account.plugin(passport);

module.exports = mongoose.model('Account',Account);