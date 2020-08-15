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

module.exports.getSingleUser = function (id, callback) {
  const sql = 'SELECT * FROM users where users.id = ?';
  getResults(sql, [id], (result) => {
    callback(result[0]);
  });
};

module.exports.updateUser = function (id, data, callback) {
  const sql = `UPDATE users SET ? WHERE users.id = '${id}'`;
  execute(sql, data, (result) => {
    callback(result);
  });
};

module.exports.removeUser = function (id, callback) {
  const sql = 'DELETE FROM users WHERE users.id = ?';
  execute(sql, [id], (result) => {
    callback(result);
  });
};
