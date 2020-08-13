const express = require('express');
const bodyParser = require('body-parser');

// App initialization
const app = express();
app.set('view engine', 'ejs');
// app.use(express.static('./public'));

// Routes
app.get('/', (req, res) => {
  res.json({ status: 'Server is up & running' });
});

app.get('/test', (req, res) => {
  res.render('index');
});

// Server
const PORT = 4000;
app.listen(PORT, () => {
  console.log('Server is running at ', PORT);
});
