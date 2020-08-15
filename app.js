const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const authController = require('./controllers/authController');
const adminController = require('./controllers/adminController');
const employeeController = require('./controllers/employeeController');
const multer = require('multer');
const { getSingleUser } = require('./models/users');

// App initialization
const app = express();
app.set('view engine', 'ejs');
// app.use(express.static('./public'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: 'my_super_secret_key',
    resave: false,
    saveUninitialized: true,
  })
);

// Private route

const privateRoute = (req, res, next) => {
  if (req.session.user) {
    getSingleUser(req.session.user.id, (result) => {
      if (result) {
        next();
      } else {
        return res.redirect('/login');
      }
    });
  } else {
    return res.redirect('/login');
  }
};

// Routes
app.get('/', (req, res) => {
  res.json({ status: 'Server is up & running' });
});

app.use('/login', authController);
app.use('/admin', privateRoute, adminController);
app.use('/employee', privateRoute, employeeController);

// Server
const PORT = 4000;
app.listen(PORT, () => {
  console.log('Server is running at ', PORT);
});

// File upload
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    cb(
      null,
      'user-' + req.session.user.username + path.extname(file.originalname)
    );
  },
});

module.exports.upload = multer({
  storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('image');

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}
