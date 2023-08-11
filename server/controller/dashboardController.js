const mongoose = require('mongoose');
const catchAsync = require('../../utils/catchAsync');

// Models
const Employee = require('../../models/employee');
const Applicant = require('../../models/applicant');

const activePage = '/';

exports.viewDashboard = async (req, res) => {
    const employeeCount = await Employee.countDocuments({});
    const jobOrderCount = await Employee.countDocuments({position: 'Job Order'})
    const casualCount = await Employee.countDocuments({position: 'Casual'})
    const regularCount = await Employee.countDocuments({position: 'Regular'})
    const applicantCount = await Applicant.countDocuments({})

   const officeMayor = await Employee.countDocuments({office: 'Office of the Mayor'});
   const officeCivil = await Employee.countDocuments({office: 'Office of the Civil Security'});
   const officeSangguniang = await Employee.countDocuments({office: 'Office of the Sangguniang Bayan'});
   const officeSB = await Employee.countDocuments({ office: 'Office of the SB Secretary'});
   const officeHuman = await Employee.countDocuments({office: "Human Resource Dev't Office"});
   const officeMPDC = await Employee.countDocuments({office: 'Office of the MPDC'});
   const officeLCR = await Employee.countDocuments({office: 'Office of the LCR'});
   const officeGen = await Employee.countDocuments({office: 'Office of Gen. Services'});
   const officeBudget = await Employee.countDocuments({office: 'Office of the Budget'});
   const officeAccountant = await Employee.countDocuments({office: 'Office of the Municipal Accountant'});
   const officeTreasurer = await Employee.countDocuments({office: 'Office of the Municipal Treasurer'});
   const officeAssessor = await Employee.countDocuments({office: 'Office of the Municipal Assessor'});
   const officeAuditing = await Employee.countDocuments({office: 'Municipal Auditing Office'});
   const officeLegal = await Employee.countDocuments({office: 'Legal Office'});
   const officeMPOC = await Employee.countDocuments({office: 'Office of the MPOC'});
   const officeHigh = await Employee.countDocuments({office: 'Municipal High School'});
   const officeManpower = await Employee.countDocuments({office: 'Office of the Manpower Development'});
   const officeHealth = await Employee.countDocuments({office: 'Municipal Health Office'});
   const officeDSWD = await Employee.countDocuments({office: 'Office of the DSWD'});
   const officeAgriculture = await Employee.countDocuments({office: 'Office of the Agriculture'});
   const officeEngineering = await Employee.countDocuments({office: "Municipal Engineering Office"});
   const officeOperation = await Employee.countDocuments({office: 'Operation Of Market'});
   const officeLGSEF = await Employee.countDocuments({office: "LGSEF - Local Gov't Service Equalization Fund"});
   const officeSpecial = await Employee.countDocuments({office: 'Special Purpose Appropriations'});
   const officeBugetary = await Employee.countDocuments({office: 'Bugetary Reserve (Calamity Fund)'});
 

    res.render('pages/dashboard/dashboard', {activePage, employeeCount, jobOrderCount, casualCount, regularCount, applicantCount, 
        officeMayor, officeCivil, officeSangguniang, officeSB, officeHuman, officeMPDC, officeLCR, officeGen, officeBudget, officeAccountant, officeTreasurer, officeAssessor, officeAuditing, officeAuditing, officeLegal, officeMPOC, officeHigh, officeManpower, officeHealth, officeDSWD, officeAgriculture, officeEngineering, officeOperation, officeLGSEF, officeSpecial, officeBugetary
    
    });
}

[{
    office: 'Office of the Mayor',
    office: 'Office of the Civil Security',
    office: 'Office of the Sangguniang Bayan',
    office: 'Office of the SB Secretary',
    office: "Human Resource Dev't Office",
    office: 'Office of the MPDC',
    office: 'Office of the LCR',
    office: 'Office of Gen. Services',
    office: 'Office of the Budget',
    office: 'Office of the Municipal Accountant',
    office: 'Office of the Municipal Treasurer',
    office: 'Office of the Municipal Assessor',
    office: 'Municipal Auditing Office',
    office: 'Legal Office',
    office: 'Office of the MPOC',
    office: 'Municipal High School',
    office: 'Office of the Manpower Development',
    office: 'Municipal Health Office',
    office: 'Office of the DSWD',
    office: 'Office of the Agriculture',
    office: "Municipal Engineering Office",
    office: 'Operation Of Market',
    office: "LGSEF - Local Gov't Service Equalization Fund",
    office: 'Special Purpose Appropriations',
    office: 'Bugetary Reserve (Calamity Fund)',
}
]
 


