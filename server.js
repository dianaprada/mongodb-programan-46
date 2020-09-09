require('dotenv').config();
/* Configure serv- Mogoose Library*/
const express = require('express');
const app = express();

/* Configure Mongoose to conect to MongoDB database - Mogoose Library*/
const mongoose = require('mongoose');


/* Database connection*/
mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true} );
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('My first database is connected'));

/* Lets server accept JSON as a body */
app.use(express.json()); 


/* Routes */

const mongorestRouter = require('./routes/mongorest');
app.use('/mongorest', mongorestRouter);




app.listen(3000, () => console.log('Ready for the party'));

