const express = require('express');
const router = express.Router();

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

module.exports = router;
