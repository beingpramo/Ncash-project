const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({

    employeeID: {
        type: Number,
        required: true,
        unique: true
      },
      name: {
        type: String,
        default: " "
      },
      username:{
        type: String,
        required: true
      },
      age: {
        type: Number,
        default: " "
      },
      mobile: {
        type: String,
        default: " "
      },
      email: {
        type: String,
        default: " "
      },
      password: {
        type: String,
        required: true,
        min: 6
      },
      address: {
        apartment: {
          type: String,
          default: " "
        },
        state: {
          type: String,
          default: " "
        },
        city: {
          type: String,
          default: " "
        },
        pinCode: {
          type: String,
          default: " "
        }
      }
      
}, {timestamps : true});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
