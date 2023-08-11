const express = require('express');
const router = express.Router();
const passport = require('passport');
const ExpressError = require('../../utils/ExpressError');
const { userSchemaValidation } = require("../../schemas");
const {isLoggedIn, storeReturnTo, isAccessibleByAdminOnly} = require('../../middlewares');
const { viewAllUsers, userForm, addUser, deleteUser, viewUser, editUser, editUserForm, viewLogin, userLogin, logout } = require('../controller/userController');


const userValidate = (req, res, next) => {
    const {error} = userSchemaValidation.validate(req.body)
    console.log(req.body)
    if(error){
       const msg = error.details.map(el=> el.message).join(',');
       throw new ExpressError(msg,400);
    }else{
      next();
    }
}

router.get('/login', viewLogin)
router.post('/login', storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), userLogin);
router.post('/logout',logout);
router.get('/users', viewAllUsers)
router.get('/users/form', userForm)
router.post('/users', userValidate, addUser)   
router.get('/users/:id', viewUser)   
router.get('/users/:id/edit', editUserForm)
router.patch('/users/:id', userValidate, editUser)
router.delete('/users/:id', deleteUser)   
 
module.exports = router