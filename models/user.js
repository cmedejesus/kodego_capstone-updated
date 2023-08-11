const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    role: {
        type: String,
        enum: ['admin', 'manager', 'staff' ]
    },
    uploadedImage: {
        filename: String,
        contentType: String,
        data: Buffer
    },
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);