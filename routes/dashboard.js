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



/* GET dashboard. */
router.get('/', function(req, res, next) {
  res.render('dashboard', {
      title: 'Dashboard'});
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

router.use(isAuthenticated)

/**
 * Edits the ticket in the database. Updates the timestamp with the time of edit.
 */
router.post('/editTicket', function(req, res, next)
{
    //find ticket by Id - if found update
    Ticket.findById(req.body._id, function(err,ticket){
        if(ticket){
            ticket.description = req.body.description
            ticket.priority =Number(req.body.priority)
            ticket.narrative = req.body.narrative
            //add checkbox for open tickets
            ticket.timestamp = (+ new Date()/1000).toFixed(0)
            ticket.save();
        }
        else{
            console.log(err)
        }
    });

  res.redirect('/dashboard')
});

// TODO
// POST
// create a new ticket
router.post('/addTicket', function(req, res, next)
{
    const newTicket = new Ticket({
        'description': req.body.description,
        'priority': Number(req.body.priority),
        'narrative': req.body.narrative,
        'open': true,
        'timestamp': (+ new Date()/1000).toFixed(0)//unix time in seconds
    });

    newTicket.save().then(() =>{
        console.log('saved');
    })
        .catch(err =>{
    console.log(err);
});

  res.redirect('/dashboard')
});

module.exports = router;
