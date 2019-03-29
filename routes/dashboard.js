/*
File Name: dashboard.js
Author: Jakub Sykora Nicholas Gardner
Website: https://ticketsystem2106.herokuapp.com/
Description: controller for the dashboard page
*/

var express = require('express');
var router = express.Router();
var Ticket = require('../models/ticket');

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    console.log('Not Authenticated')
    res.redirect('/login');
}

router.use(isAuthenticated)

/* GET dashboard. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
});

/**
 * Return all the tickets from the database.
 */
router.get('/tickets', function(req, res, next)
{
    Ticket.find(function(err,tickets){
        res.json(tickets);
    });
});



/**
 * accepts json, gets a ticket by id, then edits it according to that json
 */
router.post('/editTicket', function(req, res, next)
{
    //find ticket by Id - if found update
    Ticket.findById(req.body._id, function(err,ticket){
        if(ticket){
            ticket.status = req.body.status
            ticket.narrative.push(req.body.narrative)
            ticket.ticketResolution = req.body.ticketResolution
            ticket.timestamp = (+ new Date()/1000).toFixed(0)
            ticket.save(); 
        }
        else{
            console.log(err)
        }
    });

  res.redirect('/dashboard')
});

/**
 * adds a new entry into the database
 */
router.post('/addTicket', function(req, res, next)
{
    const newTicket = new Ticket({
        'description': req.body.description,
        'recordNumber': (+ new Date()/1000).toFixed(0),
        'priority': Number(req.body.priority),
        'narrative': req.body.narrative,
        'ticketResolution': null,
        'cxName': req.body.cxName,
        'status': 'Open',
        'timestamp': (+ new Date()/1000).toFixed(0)//unix time in seconds
    });

    newTicket.save().then(() =>{
        console.log('saved');
    })
        .catch(() =>{
    console.log('err');
});

  res.redirect('/dashboard')
});

module.exports = router;
