const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const { userLogin, getAllEmployees } = require('../models/users');

const userValidator = [
  body('username').not().isEmpty().trim(),
  body('password').not().isEmpty().isLength({ min: 4 }),
];

router.get('/', (req, res) => {
  return res.render('auth/login');
});

// Login
router.post('/', userValidator, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('auth/login', { error: errors.array()[0].msg });
  }

  const username = req.body.username;
  const password = req.body.password;

  userLogin(username, (result) => {
    if (result.length === 0) {
      return res.render('auth/login', { error: 'Username not found' });
    }

    if (password !== result[0].password) {
      return res.render('auth/login', { error: 'Invalid credentials' });
    }

    req.session.user = result[0];
    if (result[0].designation === 'admin') {
      return res.redirect('/admin');
    } else {
      return res.redirect('/employee');
    }
  });
});

module.exports = router;
