const mongoose =require('mongoose');
const catchAsync = require('../../utils/catchAsync');
const Applicant = require('../../models/applicant');
const Employee = require('../../models/employee');
const Transaction = require('../../models/transaction')
// Seeds
const offices = require('../../seeds/offices');
const positions = require('../../seeds/position');
const designations = require('../../seeds/designation');
// Models
const User = require('../../models/user'); 


const activePage = '/applications'

async function generateNewEmployeeId(applicantPosition, applicantStartYear) {
    const existingEmployees = await Employee.find({}, 'employeeId'); // Fetch all existing employeeIds
    const usedNumbers = existingEmployees.map((employee) =>
      parseInt(employee.employeeId.slice(-3), 10)
    );
  
    const min = 1;
    const max = 5000;
    for (let i = min; i <= max; i++) {
      if (!usedNumbers.includes(i)) {
        const paddedNumber = String(i).padStart(4, '0');
        return `${applicantPosition}${applicantStartYear}${paddedNumber}`;
      }
    }
  
    throw new Error('All possible employee numbers are used.');
  }

exports.viewAllApplicants = catchAsync(async(req, res) => {
    const applicants = await Applicant.find({});
    applicants.reverse();
    res.render('pages/application/appManagement',{applicants, offices, positions, designations, activePage});
})

exports.applicantForm = (req, res) => {
    res.render('pages/application/newAppForm', {offices, positions, designations, activePage})
}

exports.addApplicant = catchAsync(async(req, res) => {
    const applicant = req.body.applicant;
    const applicantPosition = applicant.position.slice(0, 3).toUpperCase()
    const applicantStartYear = applicant.dateStart.slice(2, 4)
    const employeeId = await generateNewEmployeeId(applicantPosition, applicantStartYear);
    req.body.applicant.employeeId = employeeId;

    const newApplicant = new Applicant(applicant);
    await newApplicant.save();

    const userId = req.user.id;
    const user = await User.findById(userId);
    const addTransaction = {
        username: user.username,
        role: user.role,
        transaction: `${applicant.firstName} ${applicant.lastName} is added to the Applicant Database.`
    }
    const transaction =  new Transaction(addTransaction);
    await transaction.save();

    res.redirect('/applications');
})

exports.viewApplicant = catchAsync(async(req, res) => {
    const id = req.params.id;
    const applicant = await Applicant.findById(id);
    res.render('pages/application/app-info', {applicant, activePage});
})

exports.editForm = catchAsync(async(req, res) => {
    const id = req.params.id;
    const applicant = await Applicant.findById(id);
    res.render('pages/application/edit', {applicant, offices, positions, designations, activePage});
})

exports.updateApplicant = catchAsync(async(req, res) => {
    const id = req.params.id;

    const findApplicant = await Applicant.findById(id);
    const last4Digits = findApplicant.employeeId.slice(5, 10);

    const applicant = req.body.applicant;
    const applicantPosition = applicant.position.slice(0, 3).toUpperCase();
    const applicantStartyear = applicant.dateStart.slice(2, 4);
    const employeeId = `${applicantPosition}${applicantStartyear}${last4Digits}`;

    req.body.applicant.employeeId = employeeId;

    const updateEmployeeId = await Applicant.findByIdAndUpdate(id, {$set: {employeeId: employeeId}});
    const applicantUpdate = await Applicant.findByIdAndUpdate(id, {...req.body.applicant});

    const userId = req.user.id;
    const user = await User.findById(userId);
    const addTransaction = {
        username: user.username,
        role: user.role,
        transaction: `${applicant.firstName} ${applicant.lastName}'s applicant profile has been updated.`
    }
    const transaction =  new Transaction(addTransaction);
    await transaction.save();

    req.flash('success', 'You updated the applicant information.');
    res.redirect(`/applications/${id}`);
})

exports.rejectApplicant = catchAsync(async (req, res) => {
    const {id} = req.params;
    const applicant = await Applicant.findByIdAndUpdate(id, {$set: {status: 'Rejected'}});

    const userId = req.user.id;
    const user = await User.findById(userId);
    const addTransaction = {
        username: user.username,
        role: user.role,
        transaction: `${applicant.firstName} ${applicant.lastName}'s application has been rejected.`
    }
    const transaction =  new Transaction(addTransaction);
    await transaction.save();
    req.flash('error', 'You rejected An applicant.');
    res.redirect(`/applications/${id}`);
})

exports.approveApplicant = catchAsync(async (req, res) => {
    const {id} = req.params;
    const applicant = await Applicant.findByIdAndUpdate(id, {$set: {status: 'Approved'}})
    const employee = new Employee({
        firstName: applicant.firstName,
        lastName: applicant.lastName,   
        age: applicant.age,
        street: applicant.street,
        barangay: applicant.barangay,
        city: applicant.city,
        birthdate: applicant.birthdate,
        province: applicant.province,
        postalCode: applicant.postalCode, 
        phoneNumber: applicant.phoneNumber,
        phoneNumber2: applicant.phoneNumber2,
        emergContactPer: applicant.emergContactPer,
        emerPhone: applicant.emerPhone,
        emerRelation: applicant.emerRelation,
        employeeId: applicant.employeeId,
        email: applicant.email,
        office: applicant.office,
        position: applicant.position,
        sssId: applicant.sssId,
        gsisId: applicant.gsisId,
        philHealthId: applicant.philHealthId,
        pagibigId: applicant.pagibigId,
        tinId: applicant.tinId,
        designation: applicant.designation,
        dateStart: applicant.dateStart
    });
    await employee.save();
    req.flash('success', 'You approved an applicant.');
    res.redirect(`/applications/${id}`);
})