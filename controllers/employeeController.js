const express = require('express');
const { body, validationResult } = require('express-validator');
const { getSingleUser, updateUser } = require('../models/users');
const { upload } = require('../app');
const router = express.Router();

// Employee home GET
router.get('/', (req, res) => {
  return res.render('employee/index');
});

// Employee profile GET
router.get('/myProfile', (req, res) => {
  const { id } = req.session.user;
  getSingleUser(id, (result) => {
    return res.render('employee/myProfile', { user: result });
  });
});

const employeeValidator = [
  body('username')
    .isLength({ min: 8 })
    .withMessage('Username must be at least 8 chars long'), // for dev purpose
  body('phone')
    .isLength({ min: 11, max: 11 })
    .withMessage('Phone must be at least 11 chars long'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password have to at least 8 characters long')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      'Password should be equal or greater than 8 character and contains (A-Z, a-z, 0-9, and special sign like @,#,$,& etc)'
    ),
];

// Employee profile GET
router.get('/updateProfile', employeeValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('admin/updateProfile', { error: errors.array() });
  }

  const { id } = req.session.user;
  getSingleUser(id, (result) => {
    return res.render('employee/updateProfile', { user: result });
  });
});

router.post('/updateProfile', employeeValidator, (req, res) => {
  const { id } = req.session.user;
  upload(req, res, (err) => {
    if (err) {
      return res.json(err);
    }
    if (err) {
      res.send('Wrong file format');
      console.log(err);
    } else {
      updateUser(id, req.body, (result) => {
        getSingleUser(id, (result) => {
          return res.redirect('/employee');
        });
      });
    }
  });
});

module.exports = router;
