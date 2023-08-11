const express = require("express");
const router = express.Router();
const {viewAllApplicants, applicantForm, addApplicant, viewApplicant,editForm,updateApplicant,rejectApplicant,approveApplicant} = require("../controller/applicationController");
const {storeReturnTo, isLoggedIn, isAccessible} = require('../../middlewares');

router.get('/applications', isLoggedIn, viewAllApplicants);
router.get('/applications/form',isLoggedIn, applicantForm);
router.post('/applications', isLoggedIn, addApplicant);
router.get('/applications/:id', isLoggedIn, viewApplicant);
router.get('/applications/:id/edit', isLoggedIn, editForm);
router.patch('/applications/:id', isLoggedIn, updateApplicant);
router.patch('/applications/:id/reject', isLoggedIn, rejectApplicant);
router.patch('/applications/:id/approve', isLoggedIn, approveApplicant);

module.exports = router;
