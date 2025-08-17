require('dotenv').config()
const mongoose = require("mongoose")

mongoose.connect(`mongodb+srv://manaswibetkar:t04l1zVc5yxSL5t1@cluster0.5jkykpc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(d=> console.log('Connected'))
.catch(e=>console.log('error',e))

module.exports = { mongoose }