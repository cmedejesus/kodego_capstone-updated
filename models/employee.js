const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const employeesSchema = new Schema({

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

    isActive: {
        type: Boolean,
        default: true
    },
    
    status: {
        type: String,
        default: 'Active'
    },
    // For Leave management relationship
    leaveBalance: {
        type: Number,
        default: 10
    },
    approvedLeaves: Number,
    pendingLeaves: Number, 
    leavesHistory: {
        type: String
    },
    leaves: [ 
        {
            type: Schema.Types.ObjectId,
            ref: 'Leave'
        }
    ],
    // End
    createdAt: {
        type: Date,
        default: Date.now(),
    }
    
  
   
})

module.exports = mongoose.model('Employee', employeesSchema);