const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')



const userRoute = require('./routes/user')
const courseRoute = require('./routes/course')
const feeRoute = require('./routes/fee')
const studentRoute = require('./routes/student')

app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.originalUrl}`);
    next();
});


mongoose.connect('mongodb+srv://abuzar:9T1EFB062HtKrS4P@myproject.rb3nglg.mongodb.net/?retryWrites=true&w=majority&appName=myProject')
.then(()=>{
    console.log("Successfully connected mongodb")
})
.catch(err=>{
    console.log(err)
})

app.use(bodyParser.json())
app.use(cors())

app.use(fileUpload({
    useTempFiles : true,
    // tempFileDir : '/tmp/'
}));


app.use('/user',userRoute)
app.use('/course',courseRoute)
app.use('/student',studentRoute)
app.use('/fee',feeRoute)



module.exports = app;