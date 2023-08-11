const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicantSchema = new Schema({
    firstName: String,
    lastName: String,   
    age: Number,
    street: String,
    barangay: String,
    city: String,
    birthdate: String,
    province: String,
    postalCode: Number, 
    phoneNumber: Number,
    phoneNumber2: Number,
    emergContactPer: String,
    emerPhone: Number,
    emerRelation: String,
    employeeId: String,
    email: String,
    office: String,
    position: String,
    sssId: String,
    gsisId: String,
    philHealthId: String,
    pagibigId: String,
    tinId: String,
    designation: String,
    dateStart: String,
    
    status: {
        type: String,
        default: 'Pending'
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('Applicant', applicantSchema);