const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const storage = multer.memoryStorage(); // Store the uploaded file in memory as a Buffer
const upload = multer({ storage: storage });
// Middlewares
const {isLoggedIn, storeReturnTo, isAccessibleByAdminOnly, isAccessibleByCurrent, userValidate} = require('../../middlewares');
// Controllers
const {registrationForm, registerUser, viewLogin, userLogin, logout, 
    viewAllUsers, userForm, addUser, viewUser, editUserForm, editUser, deleteUser, uploadImage} = require('../controller/usersController');

router.get('/register', isLoggedIn, isAccessibleByAdminOnly, registrationForm);
router.post('/register', isLoggedIn, isAccessibleByAdminOnly, registerUser);
router.get('/login', viewLogin);
router.post('/login', storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), userLogin);
router.post('/logout', logout);

router.get('/users', isLoggedIn, isAccessibleByAdminOnly, viewAllUsers);
router.get('/users/form', isLoggedIn, isAccessibleByAdminOnly, userForm);
router.post('/users', isLoggedIn, isAccessibleByAdminOnly, userValidate, addUser);  
router.get('/users/:id', isLoggedIn, isAccessibleByCurrent, viewUser);   
router.get('/users/:id/edit', isLoggedIn, isAccessibleByAdminOnly, editUserForm);
router.patch('/users/:id', isLoggedIn, isAccessibleByAdminOnly, userValidate, editUser);
router.delete('/users/:id/delete', isLoggedIn, isAccessibleByAdminOnly, deleteUser);
router.post('/users/:id/uploadimage', upload.single('file'), uploadImage);

module.exports = router;