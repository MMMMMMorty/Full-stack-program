const express = require('express')
var morgan = require('morgan')
const app = express()
app.use(express.static('build'))
require('dotenv').config()
const Person = require('./models/person')

app.use(express.json())
app.use(morgan(function (tokens, req, res) {
  if(req.body.name !== undefined&&req.body.number !== undefined){
    const body ={
      'name': req.body.name,
      'number': req.body.number
    }
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(body)
    ].join(' ')
  }
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      console.log(person)
      if (person){
        response.json(person)
      }else{
        response.status(404).send({ error: 'unknown id' }).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  Person.find({}).then(result => {
    var number = result.length
    var time = Date()
    response.send(`<div>Phonebook has info for ${number} people</div><div>${time}</div>`)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  if(body.name === undefined || body.number === undefined){
    response.send({ error: 'name or number is required' }).end()
  }else{
    const person = {
      name: body.name,
      number: body.number,
    }
    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, name: 'query' })
      .then(updatedPerson => {
        if(updatedPerson){
          response.json(updatedPerson)
        }else{
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  }
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if(body.name === undefined || body.number === undefined){
    response.send({ error: 'name or number is required' }).end()
  }else{
    Person.findOne({ name: body.name }).then(result => {
      if (result){
        response.send({ error: 'name must be unique' }).end()
      } else{
        const person = new Person( {
          name: body.name,
          number: body.number
        })
        person.save()
          .then(savePerson => {
            response.json(savePerson)
          })
          .catch(error => next(error))
      }
    })
  }
})
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})