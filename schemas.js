const Joi = require('joi');

module.exports.userSchemaValidation = Joi.object({
    user: Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required()
    }).required()

})

module.exports.employeeSchemaValidation = Joi.object({
    employee: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        age: Joi.number().integer().min(18).required(),
        street: Joi.string().required(),
        barangay: Joi.string().required(),
        city: Joi.string().required(),
        birthdate: Joi.date().required(),
        province: Joi.string().required(),
        postalCode: Joi.number().required(),
        phoneNumber: Joi.number().required(),
        phoneNumber2: Joi.number().allow('').optional(),
        emergContactPer: Joi.string().required(),
        emerPhone: Joi.number().required(),
        emerRelation: Joi.string().required(),
        employeeId: Joi.string().allow('').optional(),
        email: Joi.string().email().required(),
        office: Joi.string().required(),
        position: Joi.string().required(),
        sssId: Joi.string().allow('').optional(), 
        gsisId: Joi.string().allow('').optional(), 
        philHealthId: Joi.string().allow('').optional(), 
        pagibigId: Joi.string().allow('').optional(),
        tinId: Joi.string().allow('').optional(), 
        designation: Joi.string(),
        dateStart: Joi.string(),
        createdAt: Joi.date().default(Date.now())
    })
})

module.exports.leaveSchemaValidation = Joi.object({
    leave: Joi.object({
        employeeId: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        leaveStart: Joi.string().required(),
        leaveEnd: Joi.string().required(),
        remarks: Joi.string().required(),
        leaveType:Joi.string().required(),
    }).required()
})