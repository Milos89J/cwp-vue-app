const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');

require("./models/meetyous");
require("./models/users");
require("./models/threads");
require("./models/posts");
require("./models/categori");

const meetyousRoutes = require('./routes/meetyous'),
      usersRoutes = require('./routes/users'),
      threadsRoutes = require('./routes/threads'),
      postsRoutes = require('./routes/posts'),
      categoriRoutes = require('./routes/categori');

mongoose.connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected!'))
  .catch(err => console.log(err));

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/meetyous', meetyousRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/posts', postsRoutes);
app.use('/api/v1/threads', threadsRoutes);
app.use('/api/v1/categori', categoriRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT , function() {
  console.log('App is running on port: ' + PORT);
});