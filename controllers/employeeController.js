const express = require('express');
const { getSingleUser } = require('../models/users');
const router = express.Router();

// Employee home GET
router.get('/', (req, res) => {
  return res.render('employee/index');
});

// Employee profile GET
router.get('/myProfile', (req, res) => {
  console.log(req.session.user);
  const { id } = req.session.user;
  getSingleUser(id, (result) => {
    return res.render('employee/myProfile', { user: result });
  });
});

// Employee profile GET
router.get('/updateProfile', (req, res) => {
  const user = users.find((user) => user.username === req.session.username);
  console.log(user);
  return res.render('employee/updateProfile', { user: user });
});

module.exports = router;
