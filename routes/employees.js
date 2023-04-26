const express = require('express');
const Employee = require('../models/Employee');

const router = express.Router();


// API to create a new employee
router.post('/create', (req, res) => {
    
  const newEmployee = new Employee({
    employeeID : req.body.employeeID,
    name : req.body.name,
    username : req.body.username,
    age : req.body.age,
    mobile : req.body.mobile,
    email : req.body.email,
    password : req.body.password,
    address : req.body.address
  });
  newEmployee.save()
    .then(employee => res.json(employee))
    .catch(err => res.status(400).json(err));
});


// API to delete an employee by ID
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  Employee.findOneAndDelete({ employeeID: id })
    .then(() => res.json({ message: 'Employee deleted successfully' }))
    .catch(err => res.status(400).json(err));
});


// API to delete all employees
router.delete('/delete-all', (req, res) => {
  Employee.deleteMany({})
    .then(() => res.json({ message: 'All employees deleted successfully' }))
    .catch(err => res.status(400).json(err));
});


// API to update an employee by ID
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  Employee.findOneAndUpdate({ employeeID: id }, req.body, { new: true })
    .then(employee => res.json(employee))
    .catch(err => res.status(400).json(err));
});


// API to fetch all employees
router.get('/get-employees', (req, res) => {
  Employee.find({})
    .then(employees => res.json(employees))
    .catch(err => res.status(400).json(err));
});

module.exports = router;

 