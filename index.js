const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
dotenv.config();

//Local Imports
const employeeRoute = require('./routes/employees');
const authRoute = require('./routes/auth');




//Database Connection
async function connectToDatabase(){
    try{
        mongoose.connect(process.env.MONGO_URL);
        console.log('Database connection established🚀');  
       }
        catch (error) {
        console.log(error);
      }
  };
connectToDatabase();


//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));


//ROUTES
app.use('/api/employees', employeeRoute);
app.use('/api/auth', authRoute);


app.listen(8000, ()=>{
    console.log(`server is running at port 8000`);
}) 