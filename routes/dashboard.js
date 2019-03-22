var express = require('express');
var router = express.Router();

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
  res.json(tickets)
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
  console.log(req.body)
  res.redirect('/dashboard')
})

module.exports = router;
