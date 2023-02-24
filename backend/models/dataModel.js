const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const dataModel = mongoose.model('user',dataSchema)

module.exports = dataModel