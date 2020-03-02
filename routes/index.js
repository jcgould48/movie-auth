const express = require('express');
const router = express.Router();

//homepage for logout
router.get('/', function(req, res, next) {
  res.render('login');
});

module.exports = router;

