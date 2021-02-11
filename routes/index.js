var express = require('express');
var router = express.Router();
list = require("../controllers/list")


/* GET home page. */
router.get('/api', list.list);

router.post('/api', list.search);

module.exports = router;

