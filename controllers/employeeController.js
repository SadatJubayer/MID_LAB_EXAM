const express = require('express');
const router = express.Router();

let users = require('../data');

// Admin home GET
router.get('/', (req, res) => {
  res.render('employee/index');
});

module.exports = router;
