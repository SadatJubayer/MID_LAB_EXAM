var mysql = require('mysql');

function getConnection(callback) {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mid_exam',
  });

  connection.connect(function (err) {
    if (err) {
      console.error('DB error: ' + err.stack);
      return;
    }
    console.log('DB Connected:  ' + connection.threadId);
  });

  callback(connection);
}

// queries that will give data back
module.exports.getResults = function (sql, params, callback) {
  getConnection(function (connection) {
    connection.query(sql, params, (error, results) => {
      if (error) {
        console.log('Error on DB getResults: ', error);
        callback([]);
      } else {
        callback(results);
      }
    });

    connection.end(function (err) {
      console.log('connection stopped');
    });
  });
};

// queries that will give status back
module.exports.execute = function (sql, params, callback) {
  getConnection(function (connection) {
    connection.query(sql, params, function (error) {
      if (error) {
        console.error('Error on SQL execute: ', error);
        callback(false);
      } else {
        callback(true);
      }
    });
    connection.end(function (err) {
      console.log('connection stopped ', err);
    });
  });
};
