const mongoose =require('mongoose');
const catchAsync = require('../../utils/catchAsync');
// Seeds
const offices = require('../../seeds/offices');
const positions = require('../../seeds/position');
const designations = require('../../seeds/designation');
// Models
const Employee = require('../../models/employee');
const Transaction = require('../../models/transaction')
const User = require('../../models/user');

// DB Connection
mongoose.connect('mongodb://127.0.0.1:27017/hrms')
.then(()=>{
    console.log('Connection Open.');
})
.catch((err)=>{
    console.log(`Error: ${err}`);
})
const activePage = '/employees'

// Function to set the number value for the employeeID
async function generateNewEmployeeId(employeePosition, employeeStartYear) {
    const existingEmployees = await Employee.find({}, 'employeeId'); // Fetch all existing employeeIds
    const usedNumbers = existingEmployees.map((employee) =>
      parseInt(employee.employeeId.slice(-3), 10)
    );
  
    const min = 1;
    const max = 5000;
    for (let i = min; i <= max; i++) {
      if (!usedNumbers.includes(i)) {
        const paddedNumber = String(i).padStart(4, '0');
        return `${employeePosition}${employeeStartYear}${paddedNumber}`;
      }
    }
  
    throw new Error('All possible employee numbers are used.');
  }

// View All Employees
exports.viewAllEmployees = async (req, res) => {
    const employees = await Employee.find({})
    res.render('pages/employee/employees',{employees, activePage, offices, positions});
}

// View New Employee Form
exports.employeesForm = (req, res)=>{
    res.render('pages/employee/employeeForm',{ offices, positions, designations, activePage});
}

// Add New Employee
exports.addEmployee = catchAsync(async (req, res) => {
    const employee = req.body.employee;

    const employeePosition = employee.position.slice(0, 3).toUpperCase()
    const employeeStartYear = employee.dateStart.slice(2, 4)

    const employeeId = await generateNewEmployeeId(employeePosition, employeeStartYear);
 
    req.body.employee.employeeId = employeeId
    
    const newEmployee = new Employee(employee);
    await newEmployee.save();
     const addTransaction = {
         transaction: `${newEmployee.firstName} is added to the database`
     }

    const transaction =  new Transaction(addTransaction);
    await transaction.save();
    res.redirect('/employees');
})

// View Specific Employee
exports.viewEmployee = catchAsync(async (req, res)=>{
    const id = req.params.id;
    const employee = await Employee.findById(id);
    res.render('pages/employee/emp-info',{employee, activePage})
})

exports.viewLeaveHistory = async (req, res) => {
    const id = req.params.id;
    const employee = await Employee.findById(id).populate('leaves');
   
    res.render('pages/employee/employeeLeaveHistory',{employee, activePage})
}

// View Update Employee Form
exports.updateEmployeeForm = catchAsync(async (req, res)=>{
    const id = req.params.id;
    const employee = await Employee.findById(id);
    res.render('pages/employee/edit',{employee, offices, positions, designations, activePage});
})

// Update Employee Form
exports.updateEmployee = catchAsync(async(req, res) => {
    const id = req.params.id;
   
    const findEmployee = await Employee.findById(id)
    const last4Digits = findEmployee.employeeId.slice(5, 10)

    const employee = req.body.employee
    const employeePosition = employee.position.slice(0, 3).toUpperCase()
    const employeeStartYear = employee.dateStart.slice(2, 4)
   
    const employeeId = `${employeePosition}${employeeStartYear}${last4Digits}`;
    
    req.body.employee.employeeId = employeeId

    const updateEmployeeId = await Employee.findByIdAndUpdate(id, { $set: {employeeId: employeeId}} )
    
    const employeeUpdate = await Employee.findByIdAndUpdate(id,{...req.body.employee});
    req.flash('success', 'You Updated The Employee Information');
    res.redirect(`/employees/${id}`)
})

exports.deleteEmployee = catchAsync(async (req, res) => {
    const id = req.params.id;
    const employee = await Employee.findById(id);
    await Employee.findByIdAndDelete(id);

    const userId = req.user.id;
    const user = await User.findById(userId);

    const addTransaction = {
        transaction: `${employee.firstName} has been deleted ${user.firstName} ${user.lastName}`
    }

    const transaction =  new Transaction(addTransaction);
    await transaction.save();
    res.redirect('/employees')
})

// Deactivate an employee
exports.deactivateEmployee = async (req, res) => {
    const {id} = req.params;
    const employee = await Employee.findByIdAndUpdate(id, {$set: {isActive: false}})
    const employeeName = `${employee.firstName.charAt(0).toUpperCase() + employee.firstName.slice(1).toLowerCase()} ${employee.lastName.charAt(0).toUpperCase() + employee.lastName.slice(1).toLowerCase()}`

    const userId = req.user.id;
    const user = await User.findById(userId);
    const firstName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase()
    const lastName = user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase()
    
    const addTransaction = {
        transaction: `${employee.firstName} is deactivated by ${firstName} ${lastName}`
    }
    const transaction =  new Transaction(addTransaction);
    await transaction.save();
    req.flash('error', `You Deactivated ${employeeName}`);
    res.redirect(`/employees/${id}`)
}

// Activate an employee
exports.activateEmployee = async (req, res) => {
    const {id} = req.params;
    const employee = await Employee.findByIdAndUpdate(id, {$set: {isActive: true}})
    const employeeName = `${employee.firstName.charAt(0).toUpperCase() + employee.firstName.slice(1).toLowerCase()} ${employee.lastName.charAt(0).toUpperCase() + employee.lastName.slice(1).toLowerCase()}`

    const userId = req.user.id;
    const user = await User.findById(userId);
    const firstName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase()
    const lastName = user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase()

    const addTransaction = {
        transaction: `${employee.firstName} is activated by ${firstName} ${lastName}`
    }
    const transaction =  new Transaction(addTransaction);
    await transaction.save();
    req.flash('success', `You Activated ${employeeName}`);
    res.redirect(`/employees/${id}`)
}


module.exports.uploadImage = async(req, res) => {
    const {id} = req.params;
    const employee = await Employee.findById(id);
    const fileData = req.file;

    if(fileData){
        const uploadedImage = employee.uploadedImage;

        uploadedImage.filename = fileData.originalname;
        uploadedImage.contentType = fileData.mimetype;
        uploadedImage.data = fileData.buffer;
        console.log(req.file)
        await employee.save();
        res.redirect(`/employees/${id}`)
    }
}
