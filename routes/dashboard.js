var express = require('express');
var router = express.Router();

/* GET dashboard. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
});

// GET tickets
// returns mock json to test the ticket builder on client
router.get('/tickets', function(req, res, next)
{
  res.json(
    {tickets: 
      [
        {
          description: 'sample ticket from json 1', 
          priority: 1, 
          narrative: 'test ticket, please ignore'
        }, 
        {
          description: 'sample ticket from json 2',
          priority: 1, 
          narrative: 'second testing ticket'
        }
      ]
    })
});

// TODO
// POST 
// alter a ticket

// TODO
// PUT
// create a new ticket

module.exports = router;
