var express = require('express');
var router = express.Router();

/* GET dashboard. */
router.get('/', function(req, res, next) {
  // TODO: get packets from database 
  // query the db for all tickets, will be sorted out on client 
  res.render('dashboard', { title: 'Dashboard' });
});

// TODO
// POST 
// alter a ticket

// TODO
// PUT
// create a new ticket

module.exports = router;
