/*
File Name: ticket.js
Author: Jakub Sykora Nicholas Gardner
Website: https://ticketsystem2106.herokuapp.com/
Description: model for the ticket, built from database
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ticket = new Schema({
    description: String,
    recordNumber: Number,
    priority: Number,
    narrative: [String],
    ticketResolution: String,
    cxName: String,
    status: String,
    timestamp: Number
});

module.exports = mongoose.model('Ticket',Ticket);