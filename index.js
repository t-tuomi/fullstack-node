
const express = require('express')
const app = express()

app.use(express.json())

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
  const id = Math.floor(Math.random() * 100000)
  const person = {
    id: id,
    name: request.body.name,
    number: request.body.number
  }
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
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(`Phonebook has info for ${persons.length} persons<p>${new Date()}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


