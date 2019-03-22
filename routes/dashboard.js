var express = require('express');
var router = express.Router();
var Ticket = require('../models/ticket');

var tickets
tickets = {tickets: 
  [
    {
      description: 'sample ticket from json 1', 
      priority: 1, 
      narrative: 'test ticket, please ignore', 
      open: true
    }, 
    {
      description: 'sample ticket from json 2',
      priority: 1, 
      narrative: 'second testing ticket', 
      open: true
    }, 
    {
      description: 'sample closed ticket',
      priority: 2,
      narrative: 'sample ticket made for testing the hide/show closed tickets functionality',
      open: false
    }
  ]
}

/* GET dashboard. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
});

// GET tickets
// returns mock json to test the ticket builder on client
router.get('/tickets', function(req, res, next)
{
  //res.json(tickets)
  //res.json(tickets)

    Ticket.find(function(err,tickets){
        res.json(tickets);
        console.log(tickets);
    });
   // res.json(Ticket)
});

// TODO
// POST 
// alter a ticket
router.post('/editTicket', function(req, res, next)
{ 
  console.log(req.body)
  res.redirect('/dashboard')
})

// TODO
// POST
// create a new ticket
router.post('/addTicket', function(req, res, next)
{
    const newTicket = new Ticket(req.body);
    newTicket.save().then(item =>{
        console.log('saved');
    })
        .catch(err =>{
    console.log('err');
});
  console.log(req.body);
  console.log((+ new Date()/1000).toFixed(0));//rounds the timestamp so we don't get decimals
  res.redirect('/dashboard')
    console.log(newTicket);
})

module.exports = router;
