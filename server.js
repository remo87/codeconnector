const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');


const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');

const app = express();

//configure body parser middleware
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//db config
const db = require('./config/keys').mongoURI;

//connect to mongo db
mongoose
    .connect(db)
    .then(() => {console.log('connected to mongo db')})
    .catch(err => {console.log(`error connecting to mongo ${err}`)});

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profiles);
app.use('/api/posts', posts);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});