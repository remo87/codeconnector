const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');

const app = express();

//db config
const db = require('./config/keys').mongoURI;

//connect to mongo db
mongoose
    .connect(db)
    .then(() => {console.log('connected to mongo db')})
    .catch(err => {console.log(`error connecting to mongo ${err}`)});

app.get('/', (req, res) => {
    res.send('hello');
});

app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});