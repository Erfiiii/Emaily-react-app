const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passprt = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));
app.use(passprt.initialize());
app.use(passprt.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000

app.listen(PORT);