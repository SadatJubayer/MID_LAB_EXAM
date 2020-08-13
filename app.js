const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const authController = require('./controllers/authController');

// App initialization
const app = express();
app.set('view engine', 'ejs');
// app.use(express.static('./public'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'my_super_secret_key',
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.get('/', (req, res) => {
  res.json({ status: 'Server is up & running' });
});

app.use('/login', authController);

// Server
const PORT = 4000;
app.listen(PORT, () => {
  console.log('Server is running at ', PORT);
});
