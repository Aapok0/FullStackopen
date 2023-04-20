const express = require('express')
const app = express()

app.use(express.json())

let people = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/info', (request, response) => {
  let date = new Date()

  response.send(
    `
    <div>Phonebook has info on ${people.length} people.</div>
    <div>${date}</div>
    `
  )
})

app.get('/api/people', (request, response) => {
  response.json(people)
})

app.get('/api/people/:id', (request, response) => {
  let id = Number(request.params.id)
  let person = people.find(person => id === person.id)
  
  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
})

app.delete('/api/people/:id', (request, response) => {
  let id = Number(request.params.id)
  people = people.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/people', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }
  else if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }
  
  name_in_phonebook = people.some(
    person => person.name.toLowerCase() === body.name.toLowerCase()
  )
  if (name_in_phonebook === true) {
    return response.status(422).json({ 
      error: 'name already exists in the phonebook' 
    })
  }

  let id = Math.floor(Math.random() * 10000)

  const person = {
    id: id,
    name: body.name,
    number: body.number
  }

  people = people.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})