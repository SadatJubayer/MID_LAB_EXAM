const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const {
  userRegister,
  getAllUsers,
  getAllEmployees,
  getSingleUser,
  updateUser,
} = require('../models/users');

// Admin home GET
router.get('/', (req, res) => {
  getAllUsers((result) => {
    return res.render('admin/dashboard', { users: result });
  });
});

// Add Employee Route
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

router.get('/AddEmployee', (req, res) => {
  return res.render('admin/AddEmployee');
});

router.post('/AddEmployee', employeeValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('admin/AddEmployee', { error: errors.array() });
  }

  userRegister(req.body, (result) => {
    return res.redirect('/admin');
  });
});

// Get all Employee Route
router.get('/AllEmployeeList', (req, res) => {
  getAllUsers((result) => {
    return res.render('admin/AllEmployeeList', { users: result });
  });
});

// Edit Employee
router.get('/update/:id', (req, res) => {
  console.log(req.params.id);
  getSingleUser(req.params.id, (result) => {
    console.log(result);
    return res.render('admin/editEmployee', { user: result });
  });
});


// Edit Employee POST
router.post('/update/:id', (req, res) => {
  console.log('new users', req.body);
  updateUser(req.params.id, req.body, (result) => {
    return res.redirect('/admin/AllEmployeeList');
  });
});

// Delete Employee GET
router.get('/delete/:id', (req, res) => {
  console.log(req.params.id);
  const user = users.find((user) => user.id === req.params.id);
  return res.render('admin/deleteEmployee', { user });
});

// Delete Employee GET
router.post('/delete/:id', (req, res) => {
  console.log(req.params.id);
  const newUsers = users.filter((user) => user.id !== req.params.id);
  users = newUsers;
  res.redirect('/admin/AllEmployeeList');
});

module.exports = router;
