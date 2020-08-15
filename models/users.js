const { execute, getResults } = require('./database');

module.exports.getAllUsers = function (callback) {
  const sql = 'SELECT * FROM users';
  getResults(sql, null, (result) => {
    callback(result);
  });
};

module.exports.getAllEmployees = function (callback) {
  const sql = 'SELECT * FROM users where designation = ?';
  getResults(sql, ['employee'], (result) => {
    callback(result);
  });
};

module.exports.userLogin = function (username, callback) {
  const sql = 'SELECT * FROM users WHERE username = ?';
  const params = [username];
  getResults(sql, params, (result) => {
    callback(result);
  });
};

module.exports.userRegister = function (data, callback) {
  const sql = 'INSERT INTO users SET ?';
  execute(sql, data, (result) => {
    callback(result);
  });
};
