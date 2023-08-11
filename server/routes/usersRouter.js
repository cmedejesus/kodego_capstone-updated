const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn, storeReturnTo, isAccessibleByAdminOnly} = require('../../middlewares');
const {registrationForm, registerUser, viewLogin, userLogin,logout} = require('../controller/usersController');


router.get('/register', isLoggedIn, registrationForm);
router.post('/register',isAccessibleByAdminOnly,  isLoggedIn, registerUser);

router.get('/login', viewLogin)
router.post('/login', storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), userLogin);
router.post('/logout',logout);

module.exports = router;