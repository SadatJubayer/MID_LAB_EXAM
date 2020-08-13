const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const users = require('../data');

const userValidator = [
  body('username').isLength({ min: 3 }), // for dev purpose
  body('password').isLength({ min: 4 }),
];

router.get('/', (req, res) => {
  return res.render('auth/login');
});

router.post('/', userValidator, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('auth/login', { error: errors.array()[0].msg });
  }

  const username = req.body.username;
  const password = req.body.password;

  // Check validity
  users.forEach((user) => {
    // Check username
    if (user.username === username) {
      // Check password
      if (user.password === password) {
        // Check user type
        req.session.username = username;
        if (user.isAdmin) {
          return res.redirect('/admin');
        } else {
          return res.redirect('/employee');
        }
      } else {
        return res.render('auth/login', { error: 'Invalid credentials' });
      }
    }
  });

  return res.render('auth/login', { error: 'Invalid credentials' });
});

module.exports = router;
