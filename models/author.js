const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name:{
      type:String,
      required: true  
    }
})

module.exports = mongoose.model('Author', authorSchema)// here Author is the name of our table in the database and authorSchema defines our table and 

// now we can import this model into our application and use this