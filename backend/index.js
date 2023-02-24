const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv").config()
const dataModel = require('./models/dataModel')

const app = express()

app.use(express.json())

app.use(cors())


const PORT = process.env.PORT || 5000

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('Connected to MongoDB')
})

app.listen(PORT,() => { 
    console.log(`Server started... running at localhost:${PORT}`)
})


app.get('/users', async (req,res) => {
    const users = await dataModel.find()
    res.send(users)
    console.log(users)
})
app.post('/save', async (req,res) => {

    const user = req.body

    const newUser = new dataModel(user)
    await newUser.save()
    console.log("Added successfully")
    res.json(user)
    console.log(user)
})
app.post('/update', async (req,res) => {

    const {_id,username,password} = req.body

   dataModel.findByIdAndUpdate(_id,{username},{password})
   .then(() => res.send("Updated Successfully"))
   .catch((err) => console.log(err))
   
})





