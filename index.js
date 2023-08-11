const express = require("express");
const app =  express();
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');

// Router Imports
const dashboardRouter = require('./server/routes/dashboardRouter');
const employeesRouters = require('./server/routes/employeesRouters');
const transactionRouters = require('./server/routes/transactionRouters');
const leaveRouters = require('./server/routes/leaveRouter');
const userRouters = require('./server/routes/userRouter');
const applicationRouters = require('./server/routes/applicationRouters');

// Configure ejs mate
app.engine('ejs', ejsMate);

// Configurations
app.set('views', path.join(__dirname,'./client/views'));
app.set('view engine', 'ejs');

// Parse form data
app.use(express.urlencoded({extended:true}))

// Serve static files from public dir
app.use(express.static(path.join(__dirname, 'public')));

//Configure Method override
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: 'ourhrmssecret',
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //     expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    //     maxAge:  1000 * 60 * 60 * 24 * 7
    // }
}

app.use(session(sessionConfig));

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect Flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


// Execute Router
app.use('', dashboardRouter)
app.use('', employeesRouters)
app.use('', leaveRouters)
app.use('', transactionRouters)
app.use('', userRouters)
app.use('', applicationRouters)

app.use('*',(req, res, next)=>{
    next(new ExpressError('Page not found Error BOI!', 404));
})

const activePage = 'nA';

// Error Handler Middleware
app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = "Something went wrong!";
    res.status(statusCode).render('error', {err, activePage});
})

app.listen(5000, () => {
    console.log("Server running in port 5000");
})