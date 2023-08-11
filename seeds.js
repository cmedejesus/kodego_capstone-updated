const mongoose = require('mongoose');
const Employee = require('./models/employee');
// Seeds
const offices = require('./seeds/offices');
const positions = require('./seeds/position');
const designations = require('./seeds/designation');
const names = require('./seeds/names');

mongoose.connect("mongodb://127.0.0.1:27017/hrms")
  .then(() => {
    console.log("Connection Open.");
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

  function generatePhoneNumber() {
    return Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
}

// Function to generate a random date within a range
function generateRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateRandomOffice() {
    const randomIndex = Math.floor(Math.random() * offices.length);
    const randomOffice = offices[randomIndex].office;

    return randomOffice;
  }

function generateRandomPosition() {
    const randomIndex = Math.floor(Math.random() * positions.length);
    const randomPosition = positions[randomIndex];

    return randomPosition;
}

function generateRandomDesignation() {
    const randomIndex = Math.floor(Math.random() * designations.length);
    const randomDesignation = designations[randomIndex];
  
    return randomDesignation;
  }

function generateRandomName() {
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomName = names[randomIndex];

    return randomName;
}



const generateRandomEmployees = async () => {
    await Employee.deleteMany({});

    for (let i = 0; i < 50; i++) {
    

    let employeeId = '';
    let position = '';

    function positionValue() {
        const generator = generateRandomPosition();
        position = generator;
        employeeId = generator.slice(0,3).toUpperCase() ;

    }
    positionValue();
    const employee = new Employee({
        firstName: generateRandomName() + i,
        lastName: 'Lastname' + i,
        age: Math.floor(Math.random() * 50) + 18,
        street: 'Street ' + i,
        barangay: 'Barangay ' + i,
        city: 'City ' + i,
        birthdate: generateRandomDate(new Date(1970, 0, 1), new Date(2005, 11, 31)).toLocaleDateString(),
        province: 'Province ' + i,
        postalCode: Math.floor(Math.random() * 9000) + 1000,
        phoneNumber: generatePhoneNumber(),
        phoneNumber2: generatePhoneNumber(),
        emergContactPer: 'Emergency Contact ' + i,
        emerPhone: generatePhoneNumber(),
        emerRelation: 'Relation ' + i,
        employeeId: employeeId,
        email: 'john' + i + '@example.com',
        office: generateRandomOffice(),
        position: position,
        sssId: 'SSSID' + i.toString().padStart(4, '0'),
        gsisId: 'GSISID' + i.toString().padStart(4, '0'),
        philHealthId: 'PH' + i.toString().padStart(4, '0'),
        pagibigId: 'PAG' + i.toString().padStart(4, '0'),
        tinId: 'TIN' + i.toString().padStart(4, '0'),
        designation: generateRandomDesignation(),
        dateStart: generateRandomDate(new Date(2010, 0, 1), new Date()).toLocaleDateString(),
    });
    await employee.save();
};
}

generateRandomEmployees().then(() => {
  mongoose.connection.close();
});