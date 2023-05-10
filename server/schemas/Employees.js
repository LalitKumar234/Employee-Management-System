const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    dateofjoining: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model("Employee", EmployeeSchema)