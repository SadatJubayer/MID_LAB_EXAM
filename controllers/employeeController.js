const express = require('express');
const router = express.Router();

let users = require('../data');

// Employee home GET
router.get('/', (req, res) => {
  return res.render('employee/index');
});

// Employee profile GET
router.get('/myProfile', (req, res) => {
  const user = users.find((user) => user.username === req.session.username);

  console.log(user);
  return res.render('employee/myProfile', { user: user });
});

module.exports = router;
