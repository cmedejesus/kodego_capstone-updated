const express = require('express');
const router = express.Router();
const ExpressError = require('../../utils/ExpressError');
const {isLoggedIn, leaveValidate, isAuthorizedBy} = require('../../middlewares');
const { viewLeaveManagement, leaveForm, addLeave, viewLeave, updateLeaveForm, updateLeave, deleteLeave } = require('../controller/leaveController');


router.get('/leave-management', isLoggedIn, viewLeaveManagement);
router.get('/leave-management/:id/new-leave-request', isLoggedIn, leaveForm);
router.post('/leave-management/:id',isLoggedIn, leaveValidate, addLeave);
router.get('/leave-management/:id',isLoggedIn, viewLeave);
router.get('/leave-management/:id/update-leave-form',isLoggedIn, updateLeaveForm);
router.patch('/leave-management/:id',isLoggedIn, isAuthorizedBy, leaveValidate, updateLeave);
router.delete('/leave-management/:id',isLoggedIn, isAuthorizedBy, deleteLeave)

module.exports = router;