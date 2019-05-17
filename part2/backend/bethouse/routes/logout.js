var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {  
    req.logout();
  
    console.log('Logged out!');
  
    res.send('Logged out!');
});

module.exports = router;
