const router = require('express').Router();
const bcrypt = require('bcrypt');
const Employee = require('../models/Employee')



//REGISTER
router.post('/register', async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      const newEmployee = await new Employee({
          employeeID : req.body.employeeID,
          username : req.body.username,
          password :  hashedPassword
        });
    
      await newEmployee.save();
      res.status(200).json(newEmployee);
    } catch (error) {
      console.log(error);
      res.status(500).send('Failed to create Employee.');
    }
  });



//LOGIN
router.post('/login', async (req, res) => {

    try {
   
      // Check if the username is registered
      const employee = await Employee.findOne({username:req.body.username});
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found.' });
      }
      //Compare Password
      const validPassword = await bcrypt.compare(req.body.password, employee.password);
      !validPassword && res.status(404).json({ message: 'Wrong Password.' });

      res.status(200).json(employee);

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });



module.exports = router;
 