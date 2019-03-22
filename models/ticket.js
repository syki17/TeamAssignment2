const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ticket = new Schema({
    description: String,
    priority: Number,
    narrative: String,
    open: Boolean,
    timestamp: Number
});

module.exports = mongoose.model('Ticket',Ticket);