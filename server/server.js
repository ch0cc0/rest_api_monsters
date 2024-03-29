if ( process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const controller = require('./util/controller');
const initializePassport = require('./passport-config');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const {getUserByUsername, getUserById} = require('./util/db_funcs');
const {checkIfAuthenticated, checkIfNotAuthenticated} = require('./util/helper_funcs');


// Routers

const dungeonMasterRouter = require('./routes/dungeon_master/routes');
const minionsRouter = require('./routes/minions/routes');
const cartRouter = require('./routes/cart/routes');
const checkoutRouter = require('./routes/checkout/routes');
const dungeonsRouter = require('./routes/dungeons/routes');

// --------------------------------

initializePassport(passport, getUserByUsername, getUserById);

const app = express();

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors());

app.use('/dungeon-master', checkIfAuthenticated, dungeonMasterRouter);
app.use('/minions', minionsRouter);
app.use('/cart', checkIfAuthenticated, cartRouter);
app.use('/cart/:cartId/checkout', checkIfAuthenticated, checkoutRouter);
app.use('/dungeons', checkIfAuthenticated, dungeonsRouter);

app.get('/', checkIfAuthenticated, (req, res) => {
    res.status(200).send(req.user);
});

app.post('/signup', checkIfNotAuthenticated, controller.addUser);

app.post('/login', checkIfNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.post('/logout', checkIfAuthenticated, (req, res) => {
    req.logOut();
    res.redirect('/login');
});

app.listen(3000, () => console.log('listening on port 3000'));