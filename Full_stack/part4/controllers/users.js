const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if(username === undefined || password === undefined){
    response.status(400).send({ error: 'username or password is not defined' })
  }else{
    if(username.length < 3|| password.length < 3){
      response.status(400).send( { error: 'username or password length should larger than 3' })
    }else{
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)
      const user = new User({
        username,
        name,
        passwordHash,
      })

      const savedUser = await user.save()

      response.status(201).json(savedUser)
    }

  }
})

module.exports = usersRouter