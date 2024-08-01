const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const connectDB = require("./src/config/connectDB");
require('dotenv').config();

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 8080 || process.env.PORT;

app.use('/api/v1', require('./src/api/routes'));

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("server running at " + PORT)
    })
})