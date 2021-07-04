const bcrypt = require('bcrypt')
const usersController = {}
const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

usersController.createUser = async (request, response) => {
  try{
   const { name, email, password } = request.body
   const usersDB = await User.findOne({email})
   if (usersDB) {
    response.status(409).json({message: 'Repeated email'})
   }else{
    const passwordCodify = await bcrypt.hash(password, 10)
    const user = new User({
       name,
       email,
       password : passwordCodify
   })

  await user.save()

  response.status(202).json({message: 'User successfully added!'})
   }
  }catch(error){
    console.log(error)
    response.status(404).json({message: error })
  }
}

usersController.loginUser = async (request, response) => {
    try{
        const { email, password} = request.body
        const userDB = await User.findOne({email})
        if(userDB){
          const passwordIsOkay = await bcrypt.compare(password, userDB.password)
          if(passwordIsOkay){
            const token = await jwt.sign({ userDB }, process.env.SECRET_JWT )
            response.status(202).json({token})
          }else{
            response.status(401).json({message: 'user unauthorized'})
          }
        }else{
          response.status(404).json({message: 'user no valid'})
        }
    }catch (error){
      console.log(error)
      response.status(404).json({message: error })
    }
}

usersController.verifyUser = async (request, response) => {
  try {
    const decode = jwt.verify(request.token, process.env.SECRET_JWT)
    const {email} = decode.userDB
    const userDB = await User.findOne({email})
    if (userDB && decode.userDB.password === userDB.password) {
      response.status(200).json({message: 'user is authenticated' }) 
    }else{
      response.status(401).json({message: 'Invalid user'})
    }
  } catch (error) {
    response.status(401).json({message: 'user token not valid'})
  }
}

module.exports = usersController
