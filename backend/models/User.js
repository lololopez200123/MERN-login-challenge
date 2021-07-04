const{Schema, model} = require('mongoose')

const userSchema = new Schema({
  
    "name": String,
    "email": String,
    "password": String
  })
  
  userSchema.set('toJSON', {
      transform: (document, returnedObject) => {
          returnedObject.id = returnedObject._id
          delete returnedObject._id
          delete returnedObject.__v
      }
  })
  const User = model("User", userSchema)

  module.exports = User