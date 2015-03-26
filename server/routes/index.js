var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    console.log(" ~~~~~~~~~~ home page ~~~~~~~~~~ ");
    res.json({ title: 'Express' });
});

router.get('/post', function(req, res) {
    console.log(" ~~~~~~~~~~ home page ~~~~~~~~~~ ");
    res.json({ title: 'Express' });
});

module.exports = router;
