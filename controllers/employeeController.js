const express = require('express');
const router = express.Router();

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

// Employee profile GET
router.get('/updateProfile', (req, res) => {
  const user = users.find((user) => user.username === req.session.username);
  console.log(user);
  return res.render('employee/updateProfile', { user: user });
});

module.exports = router;
