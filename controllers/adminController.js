const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

let users = require('../data');

// Admin home GET
router.get('/', (req, res) => {
  let adminCount = 0;
  users.forEach((user) => {
    if (user.isAdmin) {
      adminCount++;
    }
  });
  const data = {
    totalUsers: users.length,
    admins: adminCount,
  };
  res.render('admin/dashboard', { data });
});

// Add Employee Route
const employeeValidator = [
  body('username')
    .isLength({ min: 8 })
    .withMessage('Username must be at least 8 chars long'), // for dev purpose
  body('phone')
    .isLength({ min: 11 })
    .withMessage('Phone must be at least 11 chars long'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password have to at least 8 characters long')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      'Password should be equal or greater than 8 character and contains (A-Z, a-z, 0-9, and special sign like @,#,$,& etc)'
    ),
];

router.get('/AddEmployee', (req, res) => {
  res.render('admin/AddEmployee');
});

router.post('/AddEmployee', employeeValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('admin/AddEmployee', { error: errors.array() });
  }

  const data = {
    id: Date.now(),
    username: req.body.username,
    password: req.body.password,
    isAdmin: false,
    userData: {
      phone: req.body.phone,
      email: req.body.email,
      gender: req.body.gender,
      address: req.body.address,
      designation: req.body.designation,
    },
  };

  users.push(data);
  res.render('admin/AllEmployeeList', { users });
});

// Get all Employee Route
router.get('/AllEmployeeList', (req, res) => {
  res.render('admin/AllEmployeeList', { users });
});

module.exports = router;
