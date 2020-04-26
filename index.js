
const express = require('express')
//const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// morgan.token('bodystr', (req, res) => {
//   return JSON.stringify(req.body)
// })
// app.use(morgan(':method :url :bodystr'))

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
  console.log(`deleted person id ${id}, persons:`, persons)
})

app.post('/api/persons', (request, response) => {
  console.log(JSON.stringify(request.body))
  const id = Math.floor(Math.random() * 100000)
  const person = {
    id: id,
    name: request.body.name,
    number: request.body.number
  }
  console.log('person to be added is  now', person)
  if (persons.find(n => n.name === person.name)) {
    console.log(person.name, 'already in the book')
    return response.status(400).json({error: 'name already in the book'})
  }
  
  if (!person.name || !person.number) {
    console.log('name or number missing')
    return response.status(400).json({error: 'name or number missing'})
  }
  persons = persons.concat(person)
  console.log('added', person)
  console.log('persons now: ', persons)
  return response.json(person)
})

app.get('/api/persons', (req, res) => {
  //console.log("get-all-backend: ", res.json(persons.data))
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(`Phonebook has info for ${persons.length} persons<p>${new Date()}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


//mongodb+srv://fullstack:<password>@cluster0-bz56j.mongodb.net/test?retryWrites=true&w=majority

